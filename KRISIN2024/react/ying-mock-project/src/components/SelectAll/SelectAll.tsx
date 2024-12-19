import React, { type FC, type KeyboardEvent, useEffect, useRef } from 'react';

import './SelectAll.css';

type SelectAllProps = {
    /** The aria-controls attribute value for A11Y */
    ariaControls: string;
    /** Whether all the checkboxes are checked */
    isAllSelected: boolean;
    /** Whether a part of the checkboxes are checked */
    isIndeterminateSelected: boolean;
    /** The keydown event of the select-all checkbox
     * @param event - The keydown event
     */
    handleKeyDown: (event: KeyboardEvent) => void;
    /** The keyup event of the select-all checkbox
     * @param event - The keyup event
     */
    handleKeyUp: (event: KeyboardEvent) => void;
    /** The change event of the select-all checkbox */
    handleChange: () => void;
};

/**
 * A select-all checkbox component with A11Y support
 *
 * @reference https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox/
 * @reference https://www.robinwieruch.de/react-checkbox-indeterminate/
 *
 * @example
 * ```tsx
 * <SelectAll
 *   ariaControls="checkbox-group"
 *   isAllSelected={false}
 *   isIndeterminateSelected={true}
 *   handleChange={() => console.log('changed')}
 *   handleKeyDown={(event) => console.log(event.key)}
 *   handleKeyUp={(event) => console.log(event.key)}
 * />
 * ```
 */
const SelectAll: FC<SelectAllProps> = props => {
    const selectAllRef = useRef<HTMLInputElement | null>(null);

    // Set the indeterminate state
    // For making the correct state of the checkbox
    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = props.isIndeterminateSelected;
        }
    }, [props.isIndeterminateSelected]);

    return (
        <div className="SelectAll">
            <input
                checked={props.isAllSelected}
                type="checkbox"
                id="SelectAll"
                value={props.ariaControls}
                onKeyDown={props.handleKeyDown}
                onKeyUp={props.handleKeyUp}
                onChange={props.handleChange}
                ref={selectAllRef}
            />
            <label htmlFor={'SelectAll'} className="CheckBox">
                Select All
            </label>
        </div>
    );
};

export default SelectAll;
