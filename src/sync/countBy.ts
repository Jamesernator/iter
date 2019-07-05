import enumerate from "./enumerate.js";

export default function countBy<T>(
    iterable: Iterable<T>
): Map<T, number>;
export default function countBy<T, Key>(
    iterable: Iterable<T>,
    toKey: (value: T, index: number) => Key,
): Map<Key, number>;
export default function countBy<T, Key=T>(
    iterable: Iterable<T>,
    toKey: (value: T, index: number) => Key = (i) => i as unknown as Key,
) {
    const map = new Map<Key, number>();
    for (const [idx, item] of enumerate(iterable)) {
        const key = toKey(item, idx);
        if (!map.has(key)) {
            map.set(key, 0);
        }
        map.set(key, map.get(key)! + 1);
    }
    return map;
}

