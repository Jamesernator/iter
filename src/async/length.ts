type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function length<T>(iterable: AsyncOrSyncIterable<T>) {
    let i = 0;
    for await (const _ of iterable) {
        i += 1;
    }
    return i;
}
