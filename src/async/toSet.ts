type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function toSet<T>(iterable: AsyncOrSyncIterable<T>) {
    const s: Set<T> = new Set();
    for await (const item of iterable) {
        s.add(item);
    }
    return s;
}
