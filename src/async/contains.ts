import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";

export default async function contains<T>(
    iterable: AsyncOrSyncIterable<T>,
    value: T,
    isEqual: ((value1: T, value2: T) => any)=Object.is,
): Promise<boolean> {
    for await (const item of iterable) {
        if (isEqual(value, item)) {
            return true;
        }
    }
    return false;
}
