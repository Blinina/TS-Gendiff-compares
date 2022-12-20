import { ElInterface } from "./TsInterface/mainInterface";

interface ResultInterface {
    [key: string]: any;
}
export default function getCountDifferents(data: ResultInterface) {
    let resultCountDif: number = 0;
    const iter = (node: ResultInterface) => {
        node.forEach((el: ElInterface) => {
            if (el.type === 'nested') {
                iter(el.children as ResultInterface)
            } else if (el.type !== 'unchanged') {
                resultCountDif += 1;
            }
        });
    }
    iter(data);
    return resultCountDif;
}

