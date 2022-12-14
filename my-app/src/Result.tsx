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

    const stylish = (item: ElInterface) => {
    //     const iter = (node: any, depth: number) => {
    //         const stylishArr = node.map((item: ElInterface) => {
                switch (item.type) {
                    case 'nested': {
                        return <div><span>{item.key}:</span> <div>{<ResultCom res={item.children}/>}</div></div>;
                    }
                    case 'unchanged': {
                        return <div className={item.type}><span>{item.key}: {item.value}</span></div>;
                    }
                    case 'removed': {
                        return <div className={item.type}><span>{item.key}: {item.value}</span></div>;
                    }
                    case 'added': {
                        return <div className={item.type}><span>{item.key}: {item.value}</span></div>;
                    }
                    case 'changed': {
                        return <div className={item.type}><span>{item.key}: {item.value1}</span></div>;
                    }
                }
    //         })
    //     }
    //     const result = iter(res, 1);
    //     return result;
    }
    return (
        <>
            <pre>
            {res?.map((el:ElInterface) => stylish(el))}
            </pre>
        </>
    )
}