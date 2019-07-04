import enumerate from "./enumerate.js"

export default function all<T>(
    iterable: Iterable<T>,
    predicate: ((value: T, index: number) => any) = x => x,
) {
    for (const [idx, item] of enumerate(iterable)) {
        if (!predicate(item, idx)) {
            return false
        }
    }
    return true
}
