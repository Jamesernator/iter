
export default function toArray<T>(iterable: Iterable<T>): Array<T> {
    const result: T[] = []
    for (const item of iterable) {
        result.push(item)
    }
    return result
}
