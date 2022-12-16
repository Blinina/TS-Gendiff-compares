import _ from 'lodash';
interface AppProps {
    [key: string]: any;
    typeVar?: string;
}
interface ElInterface {
    key: string,
    type: string,
    children?: any,
    value?: string | number,
    value1?: string | number,
    value2?: string | number,
}


export default function ResultBefore({ res, typeVar }: AppProps) {
    console.log(typeVar)
    let depth = 1;
    function getSpace(defaultDepth: number, backTab = 2) {
        const tab = ' ';
        const tabDefault = 4;
        const defaultSpace = tab.repeat(defaultDepth * tabDefault - backTab);
        return defaultSpace;
    };

    function getformattedValue(value: any, depth: number) {
        if (!_.isObject(value)) {
            return `"${String(value)}"`;
        }
        const newspace: any = getSpace(depth);
        const elements = Object.entries(value);
        const result: any = elements.map(([keys, elValue]) => `${newspace} "${keys}": ${getformattedValue(elValue, depth + 1)}`);

        return ['{', ...result, `${getSpace(depth, 4)}}`].join('\n');
    };
    function stylish(item: any, depth: number) {
        const space = getSpace(depth);
        if (item.type === 'changed') {
            return <div className={item.type}>{`${space} "${item.key}": ${getformattedValue(item.value1, depth + 1)}\n`}</div>;

        }
        return <div className={item.type}>{`${space} "${item.key}": ${getformattedValue(item.value, depth + 1)}`}</div>;
    };
    const space = getSpace(depth);

    return (
        <>
            <pre>
                {res?.map((el: ElInterface) => el.type !== 'added'
                    &&
                    ((el.type === 'nested')
                        ? <div className={`${el.type}`}><span> {space} {`"${el.key}"`}: {el.children && <div className={` deep${depth}`}><ResultBefore res={el.children} /></div>} {`}`} </span></div>
                        :
                        (<>{stylish(el, depth)}</>))
                )}
            </pre>
        </>
    )
}





