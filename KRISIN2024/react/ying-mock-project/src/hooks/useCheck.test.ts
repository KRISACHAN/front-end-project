import { act, renderHook } from '@testing-library/react-hooks';
import { isFunction } from 'lodash';
import { type KeyboardEvent } from 'react';
import type { MultiCheckProps } from '../types.d';
import useCheck from './useCheck';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('useCheck', () => {
    const mockProps: MultiCheckProps = {
        label: 'fake label',
        options: [
            { label: 'Fake option 1', value: '1' },
            { label: 'Fake option 2', value: '2' },
        ],
        columns: 1,
        values: ['1'],
        onChange: jest.fn(),
    };

    const mockAllSelectedValues = ['1', '2'];

    const ariaControls = mockAllSelectedValues.join(', ');

    const mockKeyboardEvent = (
        type: KeyboardEvent['type'],
        key: KeyboardEvent['key'],
    ) => {
        return new KeyboardEvent(type, { key }) as unknown as KeyboardEvent;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('initial state', () => {
        it('Export default state: pass defaultProps', () => {
            const { result } = renderHook(() => useCheck(mockProps));
            expect(result.current.state).toEqual({
                label: 'fake label',
                options: mockProps.options,
                columns: mockProps.columns,
                values: mockProps.values,
                isAllSelected: false,
                isIndeterminateSelected: true,
                ariaControls: ariaControls,
            });
            expect(isFunction(result.current.events.onChange)).toBe(true);
            expect(isFunction(result.current.events.onSelectAllChange)).toBe(
                true,
            );
            expect(isFunction(result.current.events.onSelectDown)).toBe(true);
            expect(isFunction(result.current.events.onSelectAllUp)).toBe(true);
            expect(isFunction(result.current.events.onSelectUp)).toBe(true);
            expect(isFunction(result.current.events.onCheckboxChange)).toBe(
                true,
            );
        });
    });

    describe('Execute callbacks', () => {
        it('Change a value: onChange', async () => {
            const { result } = renderHook(() => useCheck(mockProps));
            await act(async () => {
                result.current.events.onChange([mockProps.options[1]]);
            });
            expect(mockProps.onChange).toHaveBeenCalledWith([
                mockProps.options[1],
            ]);
            expect(result.current.state.values).toEqual([
                mockProps.options[1].value,
            ]);
        });

        it('No changing: onChange is not a function', async () => {
            const { result } = renderHook(() =>
                useCheck({
                    ...mockProps,
                    onChange: undefined,
                }),
            );
            await act(async () => {
                result.current.events.onChange([]);
            });
            expect(mockProps.onChange).not.toHaveBeenCalled();
            expect(result.current.state.values).toEqual([]);
        });

        it('onSelectAllChange', async () => {
            const { result } = renderHook(() => useCheck(mockProps));
            await act(async () => {
                result.current.events.onSelectAllChange();
            });
            expect(mockProps.onChange).toHaveBeenCalledWith(mockProps.options);
            expect(result.current.state.values).toEqual(mockAllSelectedValues);
        });

        it('onSelectDown', async () => {
            const { result } = renderHook(() => useCheck(mockProps));
            const event = mockKeyboardEvent('keydown', ' ');

            await act(async () => {
                result.current.events.onSelectDown(event);
            });

            expect(result.current.state).toEqual({
                label: mockProps.label,
                options: mockProps.options,
                columns: mockProps.columns,
                values: mockProps.values,
                isAllSelected: false,
                isIndeterminateSelected: true,
                ariaControls: ariaControls,
            });
        });

        it('No changing: onSelectAllUp with press a', async () => {
            const { result } = renderHook(() => useCheck(mockProps));
            const event = mockKeyboardEvent('keydown', 'a');

            await act(async () => {
                result.current.events.onSelectAllUp(event);
            });

            expect(result.current.state).toEqual({
                label: mockProps.label,
                options: mockProps.options,
                columns: mockProps.columns,
                values: mockProps.values,
                isAllSelected: false,
                isIndeterminateSelected: true,
                ariaControls: ariaControls,
            });
        });

        it('Change all the values: onSelectAllUp with press space', async () => {
            const { result } = renderHook(() => useCheck(mockProps));
            const event = mockKeyboardEvent('keydown', ' ');

            await act(async () => {
                result.current.events.onSelectAllUp(event);
                await delay(100);
                result.current.events.onSelectAllUp(event);
            });

            expect(result.current.state.values).toEqual([]);
        });

        it('Change a value: onSelectUp', async () => {
            const { result } = renderHook(() => useCheck(mockProps));
            const event = mockKeyboardEvent('keyup', ' ');

            await act(async () => {
                result.current.events.onSelectUp(
                    event,
                    mockProps.options[1].value,
                );
            });

            expect(result.current.state.values).toEqual(mockAllSelectedValues);
        });

        it('No changing: onSelectUp with press a', async () => {
            const { result } = renderHook(() => useCheck(mockProps));
            const event = mockKeyboardEvent('keyup', 'a');

            await act(async () => {
                result.current.events.onSelectUp(
                    event,
                    mockProps.options[1].value,
                );
            });

            expect(result.current.state.values).toEqual(mockProps.values);
        });

        it('Add a value: onCheckboxChange', async () => {
            const { result } = renderHook(() => useCheck(mockProps));

            await act(async () => {
                result.current.events.onCheckboxChange(
                    mockProps.options[1].value,
                );
            });

            expect(result.current.state.values).toEqual(mockAllSelectedValues);
        });

        it('Remove a value: onCheckboxChange', async () => {
            const { result } = renderHook(() => useCheck(mockProps));

            await act(async () => {
                result.current.events.onCheckboxChange(
                    mockProps.options[0].value,
                );
            });

            expect(result.current.state.values).toEqual([]);
        });
    });
});
