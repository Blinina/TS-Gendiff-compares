import _ from 'lodash';
type FileType = {
    [key: string]: string | number | NestedType;
}
type NestedType = {
    [key: string]: string | number | NestedType;
}
interface ElInterface {
    key: string,
    type: string,
    children?: any,
    value?: string | number,
    value1?: string | number,
    value2?: string | number,
}


function buildDiffTree (file1: FileType | NestedType, file2: FileType | NestedType): any {
    const keys: string[] = _.union(Object.keys(file1), Object.keys(file2));

    return keys.map((key: string) => {
        if (_.isObject(file1[key]) && _.isObject(file2[key])) {
            return { key, type: 'nested', children: buildDiffTree(file1[key] as NestedType, file2[key] as NestedType) };
        }
        if (!file1.hasOwnProperty(key) && file2.hasOwnProperty(key)) {
            return { key, type: 'added', value: file2[key] };
        }
        if (!file2.hasOwnProperty(key) && file1.hasOwnProperty(key)) {
            return { key, type: 'removed', value: file1[key] };
        }
        if (file1[key] !== file2[key]) {
            return { key, type: 'changed', value1: file1[key], value2: file2[key] }
        }

        return { key, type: 'unchanged', value: file1[key] };
    })
}

//  function getSpace  (defaultDepth: number, backTab = 2) {
//     const tab: string = ' ';
//     const tabDefault = 4;
//     const defaultSpace = tab.repeat(defaultDepth * tabDefault - backTab);
//     return defaultSpace;
//   };
  
//   function getformattedValue (value: any, depth: number) {
//     if (!_.isObject(value)) {
//       return `${value}`;
//     }
//     const newspace = getSpace(depth);
//     const elements = Object.entries(value);
//     const result: any = elements.map(([keys, elValue]) => `${newspace}  ${keys}: ${getformattedValue(elValue, depth + 1)}`);
  
//     return ['{', ...result, `${getSpace(depth, 4)}}`].join('\n');
//   };
  
//   const stylish = (data: any) => {
//     const iter = (node: any, depth: number) => {
//       const space = getSpace(depth);
  
//       const stylishArr = node.map((item: ElInterface ) => {
//         switch (item.type) {
//           case 'nested': {
//             return `${space}  ${item.key}: {\n${iter(item.children, depth + 1)}`;
//           }
//           case 'unchanged': {
//             return `${space}  ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
//           }
//           case 'removed': {
//             return `${space}- ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
//           }
//           case 'added': {
//             return `${space}+ ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
//           }
//           case 'changed': {
//             return `${space}- ${item.key}: ${getformattedValue(item.value1, depth + 1)}\n${space}+ ${item.key}: ${getformattedValue(item.value2, depth + 1)}`;
//           }
//           default: {
//             throw new Error('This type in not exsist');
//           }
//         }
//       });
//       console.log([...stylishArr, `${getSpace(depth, 4)}}`].join('\n'))
//       return [...stylishArr, `${getSpace(depth, 4)}}`].join('\n');
//     };
//     const result = `{\n${iter(data, 1)}`;
//     return result;
//   };
  



export default function getDiff(data: { file1: string; file2: string }) {

    const file1Obj: FileType = JSON.parse(data.file1);
    const file2Obj: FileType = JSON.parse(data.file2);
    // const pi =  buildDiffTree(file1Obj, file2Obj);
    return buildDiffTree(file1Obj, file2Obj);

}

// function getSpace  (defaultDepth: number, backTab = 2) {
//     const tab: string = ' ';
//     const tabDefault = 4;
//     const defaultSpace = tab.repeat(defaultDepth * tabDefault - backTab);
//     return defaultSpace;
//   };
  
//   function getformattedValue (value: any, depth: number) {
//     if (!_.isObject(value)) {
//       return `${value}`;
//     }
//     const newspace = getSpace(depth);
//     const elements = Object.entries(value);
//     const result: any = elements.map(([keys, elValue]) => `${newspace}  ${keys}: ${getformattedValue(elValue, depth + 1)}`);
  
//     return ['{', ...result, `${getSpace(depth, 4)}}`].join('\n');
//   };
  
//   const stylish = (data: any) => {
//     const iter = (node: any, depth: number) => {
//       const space = getSpace(depth);
  
//       const stylishArr = node.map((item: ElInterface ) => {
//         switch (item.type) {
//           case 'nested': {
//             return `${space}  ${item.key}: {\n${iter(item.children, depth + 1)}`;
//           }
//           case 'unchanged': {
//             return `${space}  ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
//           }
//           case 'removed': {
//             return `${space}- ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
//           }
//           case 'added': {
//             return `${space}+ ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
//           }
//           case 'changed': {
//             return `${space}- ${item.key}: ${getformattedValue(item.value1, depth + 1)}\n${space}+ ${item.key}: ${getformattedValue(item.value2, depth + 1)}`;
//           }
//           default: {
//             throw new Error('This type in not exsist');
//           }
//         }
//       });
//       console.log([...stylishArr, `${getSpace(depth, 4)}}`].join('\n'))
//       return [...stylishArr];
//     };
//     const result = `{\n${iter(data, 1)}`;
//     return result;
//   };
  







