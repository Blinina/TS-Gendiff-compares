import _ from 'lodash';

type FileType = {
    [key: string]: string | number | NestedType;
}
type NestedType = {
    [key: string]: string | number | NestedType;
}
interface Result {
    [key: string]: any;
    render: boolean;
}
interface ElInterface {
    key: string,
    type: string,
    children?: any,
    value?: string | number,
    value1?: string | number,
    value2?: string | number,
}

function buildDiffTree(file1: FileType | NestedType, file2: FileType | NestedType): any {
    const keys: string[] = _.union(Object.keys(file1), Object.keys(file2));

    return keys.map((key: string) => {
        if (_.isObject(file1[key]) && _.isObject(file2[key])) {
            return { key, type: 'nested', children: buildDiffTree(file1[key] as NestedType, file2[key] as NestedType) };
        }
        if (!_.has(file1, key)) {
            return { key, type: 'added', value: file2[key] };
        }
        if (!_.has(file2, key)) {
            return { key, type: 'removed', value: file1[key] };
        }
        if (file1[key] !== file2[key]) {
            return {
                key, type: 'changed', value1: file1[key], value2: file2[key],
            };
        }
        return { key, type: 'unchanged', value: file1[key] };
    });
}

export default function getDiff(data: { file1: string; file2: string }) {
    const file1Obj: FileType = JSON.parse(data.file1);
    const file2Obj: FileType = JSON.parse(data.file2);
    return buildDiffTree(file1Obj, file2Obj);

}

export function getSpace(defaultDepth: number, backTab = 2) {
    const tab = ' ';
    const tabDefault = 4;
    const defaultSpace = tab.repeat(defaultDepth * tabDefault - backTab);
    return defaultSpace;
};
function getformattedValue(value: any, depth: number) {
    if (!_.isObject(value)) {
        return typeof value === 'string' ? `"${String(value)}"` : `${String(value)}`;
    }
    const newspace: any = getSpace(depth);
    const elements = Object.entries(value);
    const result: any = elements.map(([keys, elValue]) => `${newspace} "${keys}": ${getformattedValue(elValue, depth + 1)},`);
    return ['{', ...result, `${getSpace(depth, 4)}}`].join('\n');
};

export function stylish(item: any, depth: number, type: number) {
    const space = getSpace(depth);
    if (item.type === 'changed') {
        return <div className={item.type}>{`${space} "${item.key}": ${getformattedValue(item[`value${type}`], depth + 1)},\n`}</div>;
    };
    return <div className={item.type}>{`${space} "${item.key}": ${getformattedValue(item.value, depth + 1)},`}</div>;
};


export const getCountDifferents = (data: Result ) => {
    let resultCountDif: number = 0;
    const iter = (node: Result) => {
        node.forEach((el: ElInterface) => {
            if (el.type === 'nested') {
                iter(el.children)
            } else if (el.type !== 'unchanged') {
                resultCountDif += 1;
            }
        });
    }
    iter(data)
    return resultCountDif;
}


