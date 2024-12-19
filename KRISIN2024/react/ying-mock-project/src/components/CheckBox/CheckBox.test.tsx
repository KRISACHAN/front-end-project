import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Option } from '../../types.d';
import CheckBox from './CheckBox';

describe('Checkbox', () => {
    const currentOption: Option = { label: 'fake label', value: 'fake value' };

    const defaultProps = {
        checked: false,
        label: currentOption.label,
        value: currentOption.value,
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
        it('Render CheckBox', () => {
            render(<CheckBox {...defaultProps} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText(currentOption.label);

            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).not.toBeChecked();
            expect(checkbox.id).toBe(currentOption.value);
            expect(label).toHaveAttribute('for', currentOption.value);
        });
    });

    describe('checked state', () => {
        it('Has checked: check CheckBox', () => {
            render(<CheckBox {...defaultProps} checked={true} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText(currentOption.label);

            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).toBeChecked();
        });

        it('Has not checked: press Space', () => {
            render(<CheckBox {...defaultProps} checked={false} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText(currentOption.label);

            fireEvent.keyDown(checkbox, {
                key: ' ',
            });
            expect(defaultProps.handleKeyDown).toHaveBeenCalled();
            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).not.toBeChecked();
        });

        it('Has checked: free Space', () => {
            render(<CheckBox {...defaultProps} checked={true} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText(currentOption.label);

            fireEvent.keyUp(checkbox, {
                key: ' ',
            });
            expect(defaultProps.handleKeyUp).toHaveBeenCalled();
            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).toBeChecked();
        });

        it('Has not checked: press Enter', () => {
            render(<CheckBox {...defaultProps} checked={false} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText(currentOption.label);

            fireEvent.keyDown(checkbox, {
                key: 'Enter',
            });
            expect(defaultProps.handleKeyDown).toHaveBeenCalled();
            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).not.toBeChecked();
        });

        it('Has checked: execute Change event', () => {
            render(<CheckBox {...defaultProps} checked={true} />);
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText(currentOption.label);

            fireEvent.click(checkbox);
            expect(defaultProps.handleChange).toHaveBeenCalled();
            expect(checkbox).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).toBeChecked();
        });
    });

    describe('UI', () => {
        it('Focus Checkbox', () => {
            render(<CheckBox {...defaultProps} />);
            const checkbox = screen.getByRole('checkbox');
            checkbox.focus();
            expect(checkbox).toHaveFocus();
        });
    });
});
