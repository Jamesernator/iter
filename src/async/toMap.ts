import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";

export default async function toMap<K, V>(
    iterable: AsyncOrSyncIterable<[K, V]>,
): Promise<Map<K, V>> {
    const m: Map<K, V> = new Map();
    for await (const item of iterable) {
        const [key, value] = item;
        m.set(key, value);
    }
    return m;
}
