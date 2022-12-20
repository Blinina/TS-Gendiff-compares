import _ from 'lodash';
import { AppProps, ElInterface } from '../../helpers/TsInterface/mainInterface';

export default function Plan({ res, acc }: AppProps) {
  let path = acc;

  const formatValue = (value: string | object |  number | boolean | undefined) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (_.isString(value)) {
      return `"${String(value)}"`;
    }
    return `${String(value)}`;
  };

  const iter = (dkey: ElInterface) => {
    const fullPath = (acc === '') ? `${dkey.key}` : `${acc}.${dkey.key}`;

    switch (dkey.type) {
      case 'unchanged':
        return <>Property "{fullPath}" wasn`t changed</>;
      case 'removed':
        return <>Property "{fullPath}" was removed</>;
      case 'added':
        return <>Property "{fullPath}" was added with value: {formatValue(dkey.value)}</>;
      case 'changed':
        return <>Property "{fullPath}" was updated. From {formatValue(dkey.value1)} to {formatValue(dkey.value2)}</>;

    }
  };

  return (
    <>
      {res.map((el: ElInterface) => <>
        {el.type === 'nested'
          ?
          <Plan res={el.children} acc={path === '' ? `${el.key}` : `${path}.${el.key}`} />
          :
          <div key={`${el.key}-${el.type}`}><span className={el.type}>{iter(el)}</span></div>}
      </>)}
    </>
  )
}