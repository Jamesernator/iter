import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";

export default async function last<T>(
    iterable: AsyncOrSyncIterable<T>,
): Promise<T> {
    let item: T;
    let itemSet = false;
    for await (item of iterable) {
        itemSet = true;
    }
    if (itemSet) {
        return item!;
    }
    throw new Error(`[last] Can't get last item of empty sequence`);
}

