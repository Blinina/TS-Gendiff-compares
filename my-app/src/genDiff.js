import _ from 'lodash';



const getSpace = (defaultDepth, backTab = 2) => {
    const tab = ' ';
    const tabDefault = 4;
    const defaultSpace = tab.repeat(defaultDepth * tabDefault - backTab);
    return defaultSpace;
  };

const getformattedValue = (value, depth) => {
    if (!_.isObject(value)) {
      return `${value}`;
    }
    const newspace = getSpace(depth);
    const elements = Object.entries(value);
    const result = elements.map(([keys, elValue]) => `${newspace}  ${keys}: ${getformattedValue(elValue, depth + 1)}`);
  
    return ['{', ...result, `${getSpace(depth, 4)}}`].join('\n');
  };
  
  const stylish = (data) => {
    const iter = (node, depth) => {
      const space = getSpace(depth);
  
      const stylishArr = node.map((item) => {
        switch (item.type) {
          case 'nested': {
            return `${space}  ${item.key}: {\n${iter(item.children, depth + 1)}`;
          }
          case 'unchanged': {
            return `${space}  ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
          }
          case 'removed': {
            return `${space}- ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
          }
          case 'added': {
            return `${space}+ ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
          }
          case 'changed': {
            return `${space}- ${item.key}: ${getformattedValue(item.value1, depth + 1)}\n${space}+ ${item.key}: ${getformattedValue(item.value2, depth + 1)}`;
          }
          default: {
            throw new Error('This type in not exsist');
          }
        }
      });
      return [...stylishArr, `${getSpace(depth, 4)}}`].join('\n');
    };
    const result = `{\n${iter(data, 1)}`;
    return result;
  };

  export const genDiff = (data ) =>{

    const file1Obj = JSON.parse(data.file1);
    const file2Obj = JSON.parse(data.file2);

    return stylish(buildDiffTree(file1Obj, file2Obj)) ;
   

    function buildDiffTree(file1, file2) {
        const keys = _.union(Object.keys(file1), Object.keys(file2));

        const rest = keys.map((key) => {
            if (_.isObject(file1[key]) && _.isObject(file2[key])) {
                return { key, type: 'nested', children: buildDiffTree(file1[key], file2[key]) };
            }
            if (!_.has(file1, key)) {
                return { key, type: 'added', value: file2[key] };
            }
            if (!_.has(file2, key)) {
                return { key, type: 'removed', value: file1[key] };
            }
            if (file1[key] !== file2[key]) {
                return { key, type: 'changed', value1: file1[key], value2: file2[key] }
            }
            return { key, type: 'unchanged', value: file1[key] };
        })
        console.log(rest)
        return rest;

    }
}