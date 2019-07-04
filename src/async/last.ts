import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default async function lastOne<T>(iterable: AsyncOrSyncIterable<T>): Promise<T> {
    let item: T
    let itemSet = false
    for await (item of iterable) {
        itemSet = true
    }
    if (itemSet) {
        return item!
    } else {
        throw new Error(`[last] Can't get last item of empty sequence`)
    }
}

