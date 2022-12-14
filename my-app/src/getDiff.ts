// import _ from 'lodash';
// export default function getDiff(data: { file1: string; file2: string }) {
//     type FileType = {
//         [key: string]: any;
//     }
//     type NestedType = {
//         [key: string]: string | number;
//     }

//     const file1Obj: FileType = JSON.parse(data.file1);
//     const file2Obj: FileType = JSON.parse(data.file2);
//     buildDiffTree(file1Obj, file2Obj)

//     function buildDiffTree(file1: FileType | NestedType, file2: FileType | NestedType) {
//         const keys: string[] = _.union(Object.keys(file1), Object.keys(file2));

//         const res = keys.map((key: string) => {
//             if (_.isObject(file1[key]) && _.isObject(file2[key])) {
//                 return { key, type: 'nested', children: buildDiffTree(file1[key], file2[key]) };
//             }
//             if (!file1.hasOwnProperty(key) && file2.hasOwnProperty(key)) {
//                 return { key, type: 'added', value: file2[key] };
//             }
//             if (!file2Obj.hasOwnProperty(key) && file1.hasOwnProperty(key)) {
//                 return { key, type: 'removed', value: file1[key] };
//             }
//             if (file1[key] !== file2[key]) {
//                 return { key, type: 'changed', value1: file1[key], value2: file2[key] }
//             }

//             return { key, type: 'unchanged', value: file1[key] };
//         })
//         console.log(res)
//     }
// }

