import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Option } from '../../types.d';
import SelectAll from './SelectAll';

describe('SelectAll', () => {
    const currentOptions: Option[] = [
        { label: 'aaa', value: '111' },
        { label: 'bbb', value: '222' },
        { label: 'ccc', value: '333' },
        { label: 'ddd', value: '444' },
        { label: 'eee', value: '555' },
        { label: 'fff', value: '666' },
        { label: 'ggg', value: '777' },
        { label: 'hhh', value: '888' },
        { label: 'iii', value: '999' },
    ];

    const defaultProps = {
        ariaControls: currentOptions.map(option => option.value).join(', '),
        isAllSelected: false,
        isIndeterminateSelected: false,
        handleKeyDown: jest.fn(),
        handleKeyUp: jest.fn(),
        handleChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('initial state', () => {
        it('Render SelectAll', () => {
            render(<SelectAll {...defaultProps} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText('Select All');

            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).not.toBeChecked();
            expect(checkbox.id).toBe('SelectAll');
            expect(label).toHaveAttribute('for', 'SelectAll');
            expect(checkbox).toHaveAttribute(
                'value',
                defaultProps.ariaControls,
            );
        });
    });

    describe('checked state', () => {
        it('Has checked: check CheckBox', () => {
            render(<SelectAll {...defaultProps} isAllSelected={true} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText('Select All');

            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).toBeChecked();
        });

        it('Has not checked: free Space', () => {
            render(<SelectAll {...defaultProps} isAllSelected={false} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText('Select All');

            fireEvent.keyDown(checkbox, {
                key: ' ',
            });
            expect(defaultProps.handleKeyDown).toHaveBeenCalled();
            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).not.toBeChecked();
        });

        it('Has checked: free Space', () => {
            render(<SelectAll {...defaultProps} isAllSelected={true} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText('Select All');

            fireEvent.keyUp(checkbox, {
                key: ' ',
            });
            expect(defaultProps.handleKeyUp).toHaveBeenCalled();
            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).toBeChecked();
        });

        it('Has not checked: press Enter', () => {
            render(<SelectAll {...defaultProps} isAllSelected={false} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText('Select All');

            fireEvent.keyDown(checkbox, {
                key: 'Enter',
            });
            expect(defaultProps.handleKeyDown).toHaveBeenCalled();
            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).not.toBeChecked();
        });

        it('Has checked: execute change event', () => {
            render(<SelectAll {...defaultProps} isAllSelected={true} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText('Select All');

            fireEvent.click(checkbox);
            expect(defaultProps.handleChange).toHaveBeenCalled();
            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).toBeChecked();
        });

        it('Has checked a part of options: change indeterminate', () => {
            const { rerender } = render(
                <SelectAll {...defaultProps} isIndeterminateSelected={false} />,
            );

            const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
            expect(checkbox.indeterminate).toBe(false);

            rerender(
                <SelectAll {...defaultProps} isIndeterminateSelected={true} />,
            );
            expect(checkbox.indeterminate).toBe(true);
        });
    });

    describe('UI', () => {
        it('Focus checkbox', () => {
            render(<SelectAll {...defaultProps} />);
            const checkbox = screen.getByRole('checkbox');
            checkbox.focus();
            expect(checkbox).toHaveFocus();
        });
    });
});
