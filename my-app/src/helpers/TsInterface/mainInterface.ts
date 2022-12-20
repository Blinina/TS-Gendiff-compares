export interface AppProps {
    [key: string]: any;
    acc: string;
};

export interface ResultProps {
    [key: string]: any;
    render: boolean;
};

export interface ElInterface {
    key: string,
    type: string,
    children?: undefined | object,
    value?: string | number | boolean | object,
    value1?: string | number | boolean | object,
    value2?: string | number | boolean | object,
};
