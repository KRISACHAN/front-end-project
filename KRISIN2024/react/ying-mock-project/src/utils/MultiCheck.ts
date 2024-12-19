import { eq, isNumber, isString } from 'lodash';
import { Option } from '../types.d';

export const DEFAULT_LABEL = 'MultiCheck';

/**
 * getSafeLabel
 *
 * @example
 * ```tsx
 * const label = getSafeLabel(undefined, 'MultiCheck');
 * console.log(label); // 'MultiCheck'
 * ```
 */
export const getSafeLabel = (
    label: string | undefined,
    defaultValue: string | undefined = 'MultiCheck',
): string => {
    if (isString(label)) {
        return label;
    }
    return isString(defaultValue) ? defaultValue : '';
};

/**
 * getSafeArray
 *
 * @example
 * ```tsx
 * const array = getSafeArray([1, 2, 3]);
 * console.log(array); // [1, 2, 3]
 * ```
 */
export const getSafeArray = (data: any) => {
    return Array.isArray(data) ? data : [];
};

// In fact, props.columns may be undefined
// But, it is used in layout
// So, need to limit it into in a reasonable range
/**
 * getSafeColumns
 *
 * @example
 * ```tsx
 * const columns = getSafeColumns(undefined);
 * console.log(columns); // 1
 * ```
 */
export const getSafeColumns = (value: number | undefined) => {
    if (!isNumber(value)) {
        return 1;
    }
    return value < 1 ? 1 : value;
};

// Due to the requirement: It may contain values not in the options.
// So, before using, we should reduce the uncontain values.
/**
 * getSafeValues
 *
 * @example
 * ```tsx
 * const values = getSafeValues(['1', '2', '3'], [{ value: '1' }, { value: '2' }, { value: '3' }]);
 * console.log(values); // ['1', '2', '3']
 * ```
 */
export const getSafeValues = (
    values: string[] | undefined,
    options: Option[] | undefined,
) => {
    const internalValues = getSafeArray(values) as string[];
    const internalOptions = getSafeArray(options) as Option[];
    return internalValues.filter(value =>
        internalOptions.find(option => eq(option.value, value)),
    );
};

// Due to the requirement:
// It may contain any values, so be careful for you "Select All" option
// So, for making sense of showing UI, remove 'Select All'
/**
 * removeSelectAllOptions
 *
 * @example
 * ```tsx
 * const options = removeSelectAllOptions([{ label: 'Select All', value: 'Select All' }, { label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]);
 * console.log(options); // [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]
 * ```
 */
export const removeSelectAllOptions = (options: Option[]) => {
    const internalOptions = getSafeArray(options) as Option[];
    return internalOptions.filter(item => !eq(item.label, 'Select All'));
};
