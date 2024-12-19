import { eq, isFunction, noop } from 'lodash';
import { useCallback, useEffect, useState, type KeyboardEvent } from 'react';
import type { MultiCheckProps, Option } from '../types.d';
import {
    DEFAULT_LABEL,
    getSafeArray,
    getSafeColumns,
    getSafeLabel,
    getSafeValues,
    removeSelectAllOptions,
} from '../utils/MultiCheck';

type UseCheckReturns = {
    state: {
        /** The main title of the MultiCheck component */
        label: string;
        /** The selectable options of the MultiCheck component */
        options: Option[];
        /** The number of the grid columns */
        columns: number;
        /** The selected values of the MultiCheck component */
        values: string[];
        /** Whether all the checkboxes are checked */
        isAllSelected: boolean;
        /** Whether a part of the checkboxes are checked */
        isIndeterminateSelected: boolean;
        /** The aria-controls attribute value for A11Y */
        ariaControls: string;
    };
    events: {
        /** The change event callback */
        onChange: (options: Option[]) => void;
        /** The change event of the select-all checkbox */
        onSelectAllChange: () => void;
        /** The keydown event of one checkbox
         * @param event - The keydown event
         */
        onSelectDown: (event: KeyboardEvent) => void;
        /** The keyup event of the select-all checkbox
         * @param event - The keyup event
         */
        onSelectAllUp: (event: KeyboardEvent) => void;
        /** The keyup event of one checkbox
         * @param event - The keyup event
         * @param value - The checkbox value
         */
        onSelectUp: (event: KeyboardEvent, value: string) => void;
        /** The change event of one checkbox
         * @param value - The checkbox value
         */
        onCheckboxChange: (data: string) => void;
    };
};

/**
 * To ensure the data logics are correct, we should know these first:
 *
 *  1. If props.options length has changed
 *      1.1. If props.options length has increase, continue
 *      1.2. If props.options length has decreased,
 *           the reduced value should be removed from selected values
 *
 *  2. If props.values length has changed
 *      2.1. If props.values length has increase, continue
 *      2.2. If props.values length has decreased,
 *           the reduced value should be removed from selected values
 *
 *  3. If props.columns has changed, layout columns should have the same performance.
 *
 *  4. Select All
 *      4.1. If selected values' length is the same as props.options,
 *           isAllSelected is true,
 *           isIndeterminateSelected is false
 *      4.2. If selected values' length is less than props.options but not zero,
 *           isAllSelected is false
 *           isIndeterminateSelected is true
 *      4.3. If selected values' length is zero
 *           isAllSelected is false
 *           isIndeterminateSelected is false
 */
/**
 * A core hook function for the MultiCheck component
 *
 * @example
 * ```tsx
 * const { state, events } = useCheck(props);
 *
 * return (
 *   <MultiCheck {...state} {...events} />
 * );
 * ```
 */
const useCheck = (props: MultiCheckProps): UseCheckReturns => {
    // To ensure the used values are safe
    const [label, setLabel] = useState(
        getSafeLabel(props.label, DEFAULT_LABEL),
    );
    const [options, setOptions] = useState(
        removeSelectAllOptions(getSafeArray(props.options)),
    );
    const [columns, setColumns] = useState(getSafeColumns(props.columns));

    const [values, setValues] = useState<string[]>(
        getSafeValues(props.values, options),
    );

    const [isAllSelected, setisAllSelected] = useState(true);
    const [isIndeterminateSelected, setisIndeterminateSelected] =
        useState(false);
    const [ariaControls, setAriaControls] = useState(() =>
        options.map(option => option.value).join(', '),
    );

    // For making the render result consistent with the user logic
    // After selecting / unselecting a value
    // We should notice the UI
    const onChange = useCallback(
        (newOptions: Option[] | []) => {
            const handler = isFunction(props.onChange) ? props.onChange : noop;
            setValues(newOptions.map(option => option.value));
            handler(newOptions);
        },
        [props.onChange],
    );

    // Make the showing result correct.
    const changeData = useCallback(
        (options: Option[] | undefined, values: string[] | undefined) => {
            const newOptions = removeSelectAllOptions(getSafeArray(options));
            const newValues = getSafeValues(values, newOptions);
            const updatedValues = newOptions.filter(option =>
                newValues.includes(option.value),
            );

            setOptions(newOptions);
            setValues(newValues);
            onChange(updatedValues);

            const hasOption = !!newOptions.length;
            const hasValue = !!newValues.length;
            const hasSelectedAll =
                hasOption &&
                hasValue &&
                eq(newOptions.length, newValues.length);
            const emptySelection = !hasValue;
            const hasSelectedPart = !hasSelectedAll && !emptySelection;
            const ariaControls = newOptions
                .map(option => option.value)
                .join(', ');

            setisAllSelected(hasSelectedAll);
            setisIndeterminateSelected(hasSelectedPart);
            setAriaControls(ariaControls);
        },
        [onChange, props.options, props.values],
    );

    // After select 'Select all', rerender all the data
    const onSelectAllChange = useCallback(() => {
        if (isAllSelected) {
            changeData(options, []);
        } else {
            changeData(
                options,
                options.map(option => option.value),
            );
        }
    }, [isAllSelected, isIndeterminateSelected, options, values, onChange]);

    const onCheckboxChange = useCallback(
        (data: string) => {
            const valueIndex = values.findIndex(value => eq(value, data));
            const valueHasExisted = valueIndex >= 0;
            const optionValues = options.map(option => option.value);
            // For inserting a correct position
            const newValues = valueHasExisted
                ? values.filter(value => !eq(value, data))
                : optionValues.filter(
                      value => eq(value, data) || values.includes(value),
                  );

            changeData(options, newValues);
        },
        [props.values, props.options, props.onChange],
    );

    useEffect(() => {
        setColumns(getSafeColumns(props.columns));
    }, [props.columns]);

    useEffect(() => {
        setLabel(getSafeLabel(props.label, DEFAULT_LABEL));
    }, [props.label]);

    useEffect(() => {
        changeData(props.options, props.values);
    }, [props.options, props.values]);

    const onSelectDown = (event: KeyboardEvent) => {
        if (eq(event.key, ' ')) {
            event.preventDefault();
        }
    };

    const onSelectAllUp = (event: KeyboardEvent) => {
        if (eq(event.key, ' ')) {
            onSelectAllChange();
        }
    };

    const onSelectUp = (event: KeyboardEvent, value: string) => {
        if (eq(event.key, ' ')) {
            onCheckboxChange(value);
        }
    };

    return {
        state: {
            label,
            options,
            columns,
            values,
            isAllSelected,
            isIndeterminateSelected,
            ariaControls,
        },
        events: {
            onChange,
            onSelectAllChange,
            onSelectDown,
            onSelectAllUp,
            onSelectUp,
            onCheckboxChange,
        },
    };
};

export default useCheck;
