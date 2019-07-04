import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default async function toArray<T>(iterable: AsyncOrSyncIterable<T>): Promise<Array<T>> {
    const result: T[] = []
    for await (const item of iterable) {
        result.push(item)
    }
    return result
}
