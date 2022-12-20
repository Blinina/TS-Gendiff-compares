import { stylish, getSpace } from '../../helpers/stylish';
import { ElInterface, ResultProps } from '../../helpers/TsInterface/mainInterface';

let depth = 1;
export default function ResultAfter({ res, render }: ResultProps) {
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




