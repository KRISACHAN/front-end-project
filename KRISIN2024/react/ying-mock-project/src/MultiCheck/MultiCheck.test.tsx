import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import type { MultiCheckProps, Option } from '../types.d';
import MultiCheck from './MultiCheck';

describe('MultiCheck', () => {
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

    const currentOption = currentOptions[0];

    const allValues = currentOptions.map(option => option.value);

    const defaultProps: MultiCheckProps = {
        label: 'Fake MultiCheck',
        options: currentOptions,
        columns: 2,
        values: allValues,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('initial state', () => {
        it('Render MultiCheck', () => {
            const { container } = render(<MultiCheck {...defaultProps} />);
            const legend = container.querySelector('legend');
            expect(legend).toBeInTheDocument();

            const selectAll = screen.getByText('Select All');
            expect(selectAll).toBeInTheDocument();

            const form = container.querySelector('.MultiCheck-columns');
            expect(form).toHaveClass('MultiCheck-columns');
            expect(form).toHaveStyle({
                display: 'grid',
                gridTemplateColumns: `repeat(${defaultProps.columns}, 1fr)`,
            });

            const checkboxes = screen.getAllByRole('checkbox');
            expect(checkboxes.length).toEqual(10);

            currentOptions.forEach(option => {
                const checkbox = screen.getByLabelText(option.label);
                expect(checkbox).toBeInTheDocument();
            });
        });
    });

    describe('checked state', () => {
        it('Select all: press space SelectAll', async () => {
            const user = userEvent.setup();
            render(<MultiCheck {...defaultProps} />);

            const selectAllCheckbox = screen.getByRole('checkbox', {
                name: 'Select All',
            });

            selectAllCheckbox.focus();
            await user.keyboard('{Space}');

            expect(selectAllCheckbox).toBeChecked();
        });

        it('Select all: click SelectAll', async () => {
            render(<MultiCheck {...defaultProps} />);

            const selectAllCheckbox = screen.getByRole('checkbox', {
                name: 'Select All',
            });

            fireEvent.change(selectAllCheckbox, { target: { checked: true } });

            expect(selectAllCheckbox).toBeChecked();
        });

        it('Clean all: press space SelectAll', async () => {
            const user = userEvent.setup();
            render(<MultiCheck {...defaultProps} values={allValues} />);

            const selectAllCheckbox = screen.getByRole('checkbox', {
                name: 'Select All',
            });

            expect(selectAllCheckbox).toBeChecked();

            selectAllCheckbox.focus();
            await user.keyboard('[Space]');

            expect(selectAllCheckbox).not.toBeChecked();
        });

        it('Clean all: click SelectAll', async () => {
            render(<MultiCheck {...defaultProps} values={allValues} />);

            const selectAllCheckbox = screen.getByRole('checkbox', {
                name: 'Select All',
            });

            fireEvent.change(selectAllCheckbox, { target: { checked: false } });

            expect(selectAllCheckbox).not.toBeChecked();
        });

        it('Select one: press Space', async () => {
            render(<MultiCheck {...defaultProps} values={[]} />);

            const checkbox = screen.getByLabelText(currentOption.label);
            checkbox.focus();

            fireEvent.keyDown(checkbox, { key: ' ' });
            fireEvent.keyUp(checkbox, { key: ' ' });

            expect(checkbox).toBeChecked();
        });

        it('Unselect one: press Space', async () => {
            render(<MultiCheck {...defaultProps} values={allValues} />);

            const checkbox = screen.getByLabelText(currentOption.label);
            checkbox.focus();

            fireEvent.keyDown(checkbox, { key: ' ' });
            fireEvent.keyUp(checkbox, { key: ' ' });

            expect(checkbox).not.toBeChecked();
        });

        it('Select one: Click', async () => {
            const user = userEvent.setup();
            render(<MultiCheck {...defaultProps} values={[]} />);

            const checkbox = screen.getByLabelText(currentOption.label);
            await user.click(checkbox);

            expect(checkbox).toBeChecked();
        });

        it('Unselect one: Click', async () => {
            const user = userEvent.setup();
            render(
                <MultiCheck
                    {...defaultProps}
                    values={defaultProps.options.map(option => option.value)}
                />,
            );

            const checkbox = screen.getByLabelText(currentOption.label);
            await user.click(checkbox);

            expect(checkbox).not.toBeChecked();
        });
    });

    describe('UI', () => {
        it('Focus select all checkbox', () => {
            render(<MultiCheck {...defaultProps} />);
            const checkbox = screen.getByLabelText('Select All');
            checkbox.focus();
            expect(checkbox).toHaveFocus();
        });

        it('Focus one checkbox', () => {
            render(<MultiCheck {...defaultProps} />);
            const checkbox = screen.getByLabelText(currentOption.label);
            checkbox.focus();
            expect(checkbox).toHaveFocus();
        });
    });
});
