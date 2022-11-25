export type filteredValuesType = {
    [key: string | number]: true;
};

export type filteredData = {
    HEAD: {
        [key: string]: string[];
    };
    DATA: {
        [key: string]: {
            [key: string]: number[];
        };
    };
    TOTAL: {
        labels: string[][];
        series: string[];
        values: number[][];
    };
};

export type marginType = {
    top: string | number;
    bottom: string | number;
    //
    left: string | number;
    right: string | number;
};
