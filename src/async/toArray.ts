type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function toArray<T>(iterable: AsyncOrSyncIterable<T>): Promise<Array<T>> {
    const result: Array<T> = [];
    for await (const item of iterable) {
        result.push(item);
    }
    return result;
}
