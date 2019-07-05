type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function toMap<K, V>(iterable: AsyncOrSyncIterable<[K, V]>) {
    const m: Map<K, V> = new Map();
    for await (const item of iterable) {
        const [key, value] = item;
        m.set(key, value);
    }
    return m;
}
