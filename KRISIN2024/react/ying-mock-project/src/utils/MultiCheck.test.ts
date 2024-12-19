import {
    getSafeArray,
    getSafeColumns,
    getSafeLabel,
    getSafeValues,
    removeSelectAllOptions,
} from './MultiCheck';

describe('utils.MultiCheck', () => {
    describe('getSafeLabel', () => {
        it('Return the empty string: label is undefined and defaultValue is undefined', () => {
            const label = getSafeLabel(undefined);
            expect(label).toBe('MultiCheck');
        });

        it('Return the defaultValue: label is undefined but defaultValue is defined', () => {
            const label = getSafeLabel(undefined, 'defaultValue');
            expect(label).toBe('defaultValue');
        });

        it('Return the label: label is defined', () => {
            const label = getSafeLabel('label');
            expect(label).toBe('label');
        });

        it('Return the empty string: label is undefined and defaultValue is not a string', () => {
            const label = getSafeLabel(undefined, 1 as any);
            expect(label).toBe('');
        });
    });

    describe('getSafeArray', () => {
        it('Return the empty array: data is undefined', () => {
            const array = getSafeArray(undefined);
            expect(array).toEqual([]);
        });

        it('Return the array: data is defined', () => {
            const array = getSafeArray([1, 2, 3]);
            expect(array).toEqual([1, 2, 3]);
        });
    });

    describe('getSafeColumns', () => {
        it('Return the default value: value is undefined', () => {
            const columns = getSafeColumns(undefined);
            expect(columns).toBe(1);
        });

        it('Return the default value: value is less than 1', () => {
            const columns = getSafeColumns(0);
            expect(columns).toBe(1);
        });

        it('Return the value: value is defined', () => {
            const columns = getSafeColumns(2);
            expect(columns).toBe(2);
        });
    });

    describe('getSafeValues', () => {
        it('Return the empty array: values and options are undefined', () => {
            const values = getSafeValues(undefined, undefined);
            expect(values).toEqual([]);
        });

        it('Return the array: values and options are defined and all values are in options', () => {
            const values = ['1', '2', '3'];
            const options = [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
            ];
            const result = getSafeValues(values, options);
            expect(result).toEqual(values);
        });

        it('Return the array: values and options are defined and some values are not in options', () => {
            const values = ['1', '2', '3'];
            const options = [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
            ];
            const result = getSafeValues(values, options);
            expect(result).toEqual(['1', '2']);
        });
    });

    describe('removeSelectAllOptions', () => {
        it('Return the empty array: options includes "Select All"', () => {
            const options = removeSelectAllOptions([
                { value: 'Select All', label: 'Select All' },
                { value: '1', label: '1' },
                { value: '2', label: '2' },
            ]);
            expect(options).toEqual([
                { value: '1', label: '1' },
                { value: '2', label: '2' },
            ]);
        });

        it('Return the array: options is not includes "Select All"', () => {
            const options = removeSelectAllOptions([
                { value: '1', label: '1' },
                { value: '2', label: '2' },
            ]);
            expect(options).toEqual([
                { value: '1', label: '1' },
                { value: '2', label: '2' },
            ]);
        });
    });
});
