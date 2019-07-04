import enumerate from "./enumerate.js"

export default function any<T>(
    iterable: Iterable<T>,
    predicate: ((value: T, index: number) => any) = i => i,
) {
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            return true
        }
    }
    return false
}

