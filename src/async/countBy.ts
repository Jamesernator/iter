import enumerate from "./enumerate.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function countBy<T, Key=T>(
    iterable: AsyncOrSyncIterable<T>,
    toKey: (value: T, index: number) => Key | PromiseLike<Key> = (i) => i as unknown as Key,
) {
    const map = new Map<Key, number>();
    for await (const [idx, item] of enumerate(iterable)) {
        const key = await toKey(item, idx);
        if (!map.has(key)) {
            map.set(key, 0);
        }
        map.set(key, map.get(key)! + 1);
    }
    return map;
}

