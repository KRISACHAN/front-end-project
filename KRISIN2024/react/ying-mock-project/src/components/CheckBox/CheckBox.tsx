import React, { type FC, type KeyboardEvent } from 'react';

import './CheckBox.css';

type CheckBoxProps = {
    /** The checked state of currect checkbox */
    checked: boolean;
    /** The displayed name of currect checkbox */
    label: string;
    /** The checkbox value */
    value: string;
    /** The keydown event of currect checkbox
     * @param event - The keydown event
     * @param value - The checkbox value
     */
    handleKeyDown: (event: KeyboardEvent, value: string) => void;
    /** The keyup event of currect checkbox
     * @param event - The keyup event
     * @param value - The checkbox value
     */
    handleKeyUp: (event: KeyboardEvent, value: string) => void;
    /** The change event of currect checkbox
     * @param value - The checkbox value
     */
    handleChange: (value: string) => void;
};

/**
 * A checkbox component with A11Y support
 *
 * @example
 * ```tsx
 * <CheckBox
 *   checked={true}
 *   label="My CheckBox"
 *   value="CheckBox"
 *   handleChange={value => console.log(value)}
 *   handleKeyDown={(event, value) => console.log(event.key, value)}
 *   handleKeyUp={(event, value) => console.log(event.key, value)}
 * />
 * ```
 */
const CheckBox: FC<CheckBoxProps> = props => {
    return (
        <div className="CheckBox">
            <input
                checked={props.checked}
                type="checkbox"
                id={props.value}
                value={props.value}
                onKeyDown={event => props.handleKeyDown(event, props.value)}
                onKeyUp={event => props.handleKeyUp(event, props.value)}
                onChange={() => props.handleChange(props.value)}
            />
            <label htmlFor={props.value}>{props.label}</label>
        </div>
    );
};

export default CheckBox;
