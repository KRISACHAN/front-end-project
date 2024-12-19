import React, { FC, useState } from 'react';

import lodash from 'lodash';

import type { Option } from './types.d';

type Props = {
    render: (
        options: Option[],
        values?: string[],
        columns?: number,
        onChange?: (options: Option[]) => void,
    ) => React.ReactNode;
};

const allOptions: Option[] = [
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

const allValues = allOptions.map(it => it.value);

// NOTE Don't modify this file
export const Controller: FC<Props> = ({ render }) => {
    const [options, setOptions] = useState<Option[]>(allOptions);
    const [values, setValues] = useState<string[] | undefined>(
        allOptions.map(it => it.value),
    );
    const [columns, setColumns] = useState<number | undefined>(2);

    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    function onSelectedOptionsChange(options: Option[]): void {
        setSelectedValues(options.map(it => it.value));
    }

    function decreaseValues() {
        setValues(it => {
            if (it === undefined) return allValues;
            if (it.length === 0) return undefined;
            return lodash.sampleSize(allValues, it.length - 1);
        });
    }

    function increaseValues() {
        setValues(it => {
            if (it === undefined) return [];
            if (it.length === allValues.length) return undefined;
            const size = it.length + 1;
            return lodash.sampleSize(allValues, size);
        });
    }

    function decreaseColumns() {
        setColumns(n => {
            if (n === undefined || n === 0) {
                return undefined;
            }
            return n - 1;
        });
    }

    function increaseColumns() {
        setColumns(n => (n === undefined ? 0 : n + 1));
    }

    return (
        <div>
            <h1>Multi Check Component</h1>
            <div>
                <button
                    onClick={() =>
                        setOptions(it => allOptions.slice(0, it.length - 1))
                    }
                >
                    -
                </button>
                <button
                    onClick={() =>
                        setOptions(it => allOptions.slice(0, it.length + 1))
                    }
                >
                    +
                </button>{' '}
                Options count [{options.length}]
            </div>
            <div>
                <button onClick={decreaseValues}>-</button>
                <button onClick={increaseValues}>+</button> Values count [
                {values?.length ?? 'undefined'}]
            </div>
            <div>
                <button onClick={decreaseColumns}>-</button>
                <button onClick={increaseColumns}>+</button> Columns [
                {columns ?? 'undefined'}]
            </div>
            <div></div>
            <hr />
            {render(options, values, columns, onSelectedOptionsChange)}
            <div>
                <h2>Current selected values:</h2>
                <div>{selectedValues.join(',')}</div>
            </div>
        </div>
    );
};
