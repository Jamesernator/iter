import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";

export default async function toObject<V>(
    iterable: AsyncOrSyncIterable<[string, V]>,
): Promise<Record<string, V>> {
    const o: Record<string, V> = Object.create(null);
    for await (const [key, value] of iterable) {
        o[key] = value;
    }
    return o;
}
