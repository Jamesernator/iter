import enumerate from "./enumerate.js"
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default async function countBy<T, Key=T>(
    iterable: AsyncOrSyncIterable<T>,
    toKey: (value: T, index: number) => Key | PromiseLike<Key>,
) {
    const map = new Map<Key, number>();
    for await (const [idx, item] of enumerate(iterable)) {
        const key = await toKey(item, idx)
        if (!map.has(key)) {
            map.set(key, 0)
        }
        map.set(key, map.get(key)! + 1)
    }
    return map
}

