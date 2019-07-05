import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default async function first<T>(iterable: AsyncOrSyncIterable<T>) {
    for await (const item of iterable) {
        return item;
    }
    throw new Error(`[first] Can't get first item of empty sequence`);
}
