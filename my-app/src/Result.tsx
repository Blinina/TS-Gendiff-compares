import _ from 'lodash';
interface AppProps {
    [key: string]: any;
}
interface ElInterface {
    key: string,
    type: string,
    children?: any,
    value?: string | number,
    value1?: string | number,
    value2?: string | number,
}


export default function ResultCom({ res }: AppProps) {
    let depth = 1;
    console.log(depth)
function getSpace (defaultDepth: number, backTab = 2){
    const tab = ' ';
    const tabDefault = 4;
    const defaultSpace = tab.repeat(defaultDepth * tabDefault - backTab);
    return defaultSpace;
  };
    function getformattedValue(value: any, depth:number){
        if (!_.isObject(value)) {
          return `${value}`;
        }
        const newspace: any = getSpace(depth);
        const elements = Object.entries(value);
        const result: any = elements.map(([keys, elValue]) => `${newspace} ${keys}: ${getformattedValue(elValue, depth + 1)}`);
      
        return ['{', ...result, `${getSpace(depth, 4)}}`].join('\n');
      };
    
    return (
        <>
            <pre>
            {res?.map((el:ElInterface) => el.type === 'nested' ? <div className={`${el.type}`}><span>{el.key}: {`{`} {el.children &&  <div className={` deep${depth}`}><ResultCom res={el.children} /></div> } {`}`}</span></div> : ((el.type !=='added' && <div className={el.type}><span>{el.key}:  {(el.value !== undefined ) ? getformattedValue(el.value, depth+1) : getformattedValue(el.value1, depth+1) } </span></div>)))}
            </pre>
            <pre>
            {res?.map((el:ElInterface) => el.type === 'nested' ? <div className={`${el.type}`}><span>{el.key}: {`{`} {el.children &&  <div className={` deep${depth}`}><ResultCom res={el.children} /></div> } {`}`}</span></div> : (el.type !=='removed' && (<div className={el.type}><span>{el.key}:  {(el.value !== undefined ) ? getformattedValue(el.value, depth+1) : getformattedValue(el.value2, depth+1) } </span></div>)))}
            </pre>
        </>
    )
}




// {res?.map((el:ElInterface) => el.type === 'nested' ? <div className={el.type}><span>{el.key}: {el.children && <ResultCom res={el.children} />}</span></div> : (el.type!=='added' && <div className={el.type}><span>{el.key}: {_.isObject(el.value) ? 'kek' : (el.value ? `${el.value}` : `${el.value1}`)}</span></div>))}
