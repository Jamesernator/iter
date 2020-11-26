import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function first<T>(iterable: AsyncOrSyncIterable<T>) {
    // eslint-disable-next-line no-unreachable-loop
    for await (const item of iterable) {
        return item;
    }
    throw new Error(`[first] Can't get first item of empty sequence`);
}
