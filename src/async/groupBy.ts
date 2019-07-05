import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";

export default async function countBy<T, Key=T>(
    iterable: AsyncOrSyncIterable<T>,
    toKey: (value: T, index: number) => Key | Promise<Key>,
) {
    const groups = new Map<Key, Array<T>>();
    for await (const [idx, item] of enumerate(iterable)) {
        const key = await toKey(item, idx);
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(item);
    }
    return groups;
}

