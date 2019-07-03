import enumerate from "./enumerate.js"
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

async function __find(iterable, predicate, hasDefault, defaultValue) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            return item
        }
    }
    if (hasDefault) {
        return defaultValue
    } else {
        throw new Error(`[find] No item found with no default provided`)
    }
}

function _find(iterable, ...args) {
    /* eslint-disable indent */
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        :
            [true, ...args]

    /* eslint-enable indent */
    return __find(iterable, predicate, hasDefault, defaultValue)
}

export default function find<T>(
    iterable: AsyncOrSyncIterable<T>,
): T | undefined;
export default function find<T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => any),
): T | undefined;
export default function find<T, Default=T>(
    iterable: AsyncOrSyncIterable<T>,
    defaultValue: Default,
    predicate: ((value: T, index: number) => any),
): T | Default;
export default function find<T, Default=T>(
    iterable: AsyncOrSyncIterable<T>,
    ...options:
        [((value: T, index: number) => any)]
        | [Default, ((value: T, index: number) => any)]
) {
    let hasDefault: boolean;
    let _default: Default;
    
}
