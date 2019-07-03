import enumerate from "./enumerate.js"
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";
import { MapLike } from "../MapLike";

type ToKey<Value, Key> = (value: Value, index: number) => Key

export default async function countBy<T, Key=T>(
    iterable: AsyncOrSyncIterable<T>,
    optionsOrToKey: ToKey<T, Key> | {
        toKey?: ToKey<T, Key>
        map?: MapLike<Key, number>,
    },
) {
    if (typeof optionsOrToKey === 'function') {
        optionsOrToKey = { toKey: optionsOrToKey }
    }

    const toKey: ToKey<T, Key> = optionsOrToKey.toKey || x => x;
    const map: MapLike<Key, number> = optionsOrToKey.map || new Map();

    for await (const [idx, item] of enumerate(iterable)) {
        const key = await toKey(item, idx)
        if (!map.has(key)) {
            map.set(key, 0)
        }
        map.set(key, map.get(key)! + 1)
    }
    return map
}

