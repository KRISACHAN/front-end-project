export type Option = {
    /** The displayed name of currect option */
    label: string;
    /** The checkbox value */
    value: string;
};

export type MultiCheckProps = {
    /** The main title of the MultiCheck component */
    label?: string;
    /** The selectable options of the MultiCheck component */
    options: Option[];
    /** The number of the grid columns */
    columns?: number;
    /** The selected values of the MultiCheck component */
    values?: string[];
    /** The change event callback */
    onChange?: (options: Option[]) => void;
};
