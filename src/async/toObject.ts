type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function toObject<V>(
    iterable: AsyncOrSyncIterable<[string, V]>,
) {
    const o: { [key: string]: V } = Object.create(null);
    for await (const [key, value] of iterable) {
        o[key] = value;
    }
    return o;
}
