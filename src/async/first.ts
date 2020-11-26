import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";

export default async function first<T>(
    iterable: AsyncOrSyncIterable<T>,
): Promise<T> {
    // eslint-disable-next-line no-unreachable-loop
    for await (const item of iterable) {
        return item;
    }
    throw new Error(`[first] Can't get first item of empty sequence`);
}
