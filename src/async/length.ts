import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default async function length<T>(iterable: AsyncOrSyncIterable<T>) {
    let i = 0
    for await (const _ of iterable) {
        i += 1
    }
    return i
}
