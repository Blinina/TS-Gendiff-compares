import _ from 'lodash';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const tooltip = (elem: string, type: string) => (
    <Tooltip id="tooltip">
        <strong>{`"${elem}"`}</strong> was {type}.
    </Tooltip>
);

export interface ElInterface {
    key: string,
    type: string,
    children?: any,
    value?: string | number,
    value1?: string | number,
    value2?: string | number,
}

export function getSpace(defaultDepth: number, backTab = 2) {
    const tab = ' ';
    const tabDefault = 4;
    const defaultSpace = tab.repeat(defaultDepth * tabDefault - backTab);
    return defaultSpace;
};
function getformattedValue(value: any, depth: number) {
    if (!_.isObject(value)) {
        return typeof value === 'string' ? `"${String(value)}"` : `${String(value)}`;
    }
    const newspace: any = getSpace(depth);
    const elements = Object.entries(value);
    const result: any = elements.map(([keys, elValue]) => `${newspace} "${keys}": ${getformattedValue(elValue, depth + 1)},`);
    return ['{', ...result, `${getSpace(depth, 4)}}`].join('\n');
};

export function stylish(item: any, depth: number, type: number) {
    const space = getSpace(depth);
    if (item.type === 'changed') {
        return (<div>
            <OverlayTrigger placement="bottom" overlay={tooltip(item.key, item.type)}>
                <div className={item.type}>{`${space} "${item.key}": ${getformattedValue(item[`value${type}`], depth + 1)},\n`}</div>
            </OverlayTrigger>
        </div>);
    };
    return (<div>
        <OverlayTrigger placement="bottom" overlay={tooltip(item.key, item.type)}>
            <div className={item.type}>{`${space} "${item.key}": ${getformattedValue(item.value, depth + 1)},`}</div>
        </OverlayTrigger>
    </div>);
};


