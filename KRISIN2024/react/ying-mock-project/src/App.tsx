import React, { FC } from 'react';

import { Controller } from './Controller';
import { MultiCheck } from './MultiCheck';

const App: FC = (): JSX.Element => {
    return (
        <Controller
            render={(options, values, columns, onChange) => (
                <MultiCheck
                    label="MultiCheck"
                    options={options}
                    onChange={onChange}
                    values={values}
                    columns={columns}
                />
            )}
        ></Controller>
    );
};

export default App;
