type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function contains<T>(
    iterable: AsyncOrSyncIterable<T>,
    value: T,
    isEqual: ((value1: T, value2: T) => any)=Object.is,
) {
    for await (const item of iterable) {
        if (isEqual(value, item)) {
            return true;
        }
    }
    return false;
}
