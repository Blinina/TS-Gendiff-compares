import { stylish, getSpace } from '../../helpers';

interface AppProps {
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


export default function ResultAfter({ res, render }: AppProps) {
    let depth = 1;
    const typeField = 2;
    const space = getSpace(depth);

    return (
        <>
            {(render && res) && <div><span>{`  {`}</span></div>}
            {res?.map((el: ElInterface) => el.type !== 'removed'
                ?
                ((el.type === 'nested')
                    ?
                    <>
                        <div><span className={`${el.type}`}> {space}{`"${el.key}"`}: {`{`} <div className={` deep${depth}`}><ResultAfter res={el.children} render={false} /></div>{space}{` },`} </span></div>
                    </>
                    :
                    <>{stylish(el, depth, typeField)}</>
                )
                :
                <div className='delete'>{' '}</div>
            )}
            {(render && res) && <div><span>{` }`}</span></div>}
        </>
    )
}




