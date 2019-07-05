import enumerate from "./enumerate.js";

export default function countBy<T, Key=T>(
    iterable: Iterable<T>,
    toKey: (value: T, index: number) => Key = (i) => i as unknown as Key,
) {
    const groups = new Map<Key, Array<T>>();
    for (const [idx, item] of enumerate(iterable)) {
        const key = toKey(item, idx);
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(item);
    }
    return groups;
}

