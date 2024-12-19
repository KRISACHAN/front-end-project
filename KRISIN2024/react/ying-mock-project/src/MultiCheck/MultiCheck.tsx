import React, { type FC } from 'react';
import Checkbox from '../components/CheckBox/CheckBox';
import SelectAll from '../components/SelectAll/SelectAll';
import useCheck from '../hooks/useCheck';
import type { MultiCheckProps } from '../types.d';
import './MultiCheck.css';

/**
 * A multiple selection component
 *
 * @example
 * ```tsx
 * <MultiCheck options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]} />
 * ```
 */
export const MultiCheck: FC<MultiCheckProps> = props => {
    const { state, events } = useCheck(props);

    return (
        <fieldset className="MultiCheck">
            {/* I belive the power of native html and css 👏👏👏 */}
            <legend>{state.label}</legend>
            <SelectAll
                isAllSelected={state.isAllSelected}
                isIndeterminateSelected={state.isIndeterminateSelected}
                ariaControls={state.ariaControls}
                handleKeyDown={events.onSelectDown}
                handleKeyUp={events.onSelectAllUp}
                handleChange={events.onSelectAllChange}
            />
            <form
                className="MultiCheck-columns"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${state.columns}, 1fr)`,
                }}
            >
                {state.options.map(option => (
                    <Checkbox
                        checked={state.values.includes(option.value)}
                        label={option.label}
                        value={option.value}
                        key={option.value}
                        handleKeyDown={events.onSelectDown}
                        handleKeyUp={events.onSelectUp}
                        handleChange={events.onCheckboxChange}
                    />
                ))}
            </form>
        </fieldset>
    );
};

export default MultiCheck;
