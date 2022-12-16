import _ from 'lodash';
type FileType = {
    [key: string]: string | number | NestedType;
}
type NestedType = {
    [key: string]: string | number | NestedType;
}

function buildDiffTree(file1: FileType | NestedType, file2: FileType | NestedType): any {
    const keys: string[] = _.union(Object.keys(file1), Object.keys(file2));

    return keys.map((key: string) => {
        if (_.isObject(file1[key]) && _.isObject(file2[key])) {
            return { key, type: 'nested', children: buildDiffTree(file1[key] as NestedType, file2[key] as NestedType) };
        } else if (!_.has(file1, key)) {
            return { key, type: 'added', value: file2[key] };
        } else if (!_.has(file2, key)) {
            return { key, type: 'removed', value: file1[key] };
        } else if (file1[key] !== file2[key]) {
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


