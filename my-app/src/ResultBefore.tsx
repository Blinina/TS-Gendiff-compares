import _ from 'lodash';
import { useEffect, useState } from 'react';
import { stylish, getSpace } from './helpers';

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
let depth = 1;

export default function ResultBefore({ res, render }: AppProps) {
    const typeField = 1;
    const space = getSpace(depth);
    return (
        <>
            {(render && res) && <div><span>{` {`}</span></div>}
            {res?.map((el: ElInterface) => el.type !== 'added'
                &&
                ((el.type === 'nested')
                    ?
                    <>
                        <div className={`${el.type}`}><span> {space} {`"${el.key}"`}: {`{`} <div className={` deep${depth}`}><ResultBefore res={el.children} render={false} /></div> {space}{`},`} </span></div>
                    </>
                    :
                    <>{stylish(el, depth, typeField)}</>
                )
                // :
                // <div className='addedSpece'>{' '}</div>
            )}
            {(render && res) && <div><span>{`  }`}</span></div>}
        </>
    )
}



