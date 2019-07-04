
export default function lastOne<T>(iterable: Iterable<T>): T {
    let item: T
    let itemSet = false
    for (item of iterable) {
        itemSet = true
    }
    if (itemSet) {
        return item!
    } else {
        throw new Error(`[last] Can't get last item of empty sequence`)
    }
}

