import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";

export default async function toSet<T>(
    iterable: AsyncOrSyncIterable<T>,
): Promise<Set<T>> {
    const s: Set<T> = new Set();
    for await (const item of iterable) {
        s.add(item);
    }
    return s;
}
