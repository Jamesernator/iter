import enumerate from "./enumerate.js";

export default function none<T>(
    iterable: Iterable<T>,
    predicate: ((value: T, index: number) => any) = (i) => i,
): boolean {
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            return false;
        }
    }
    return true;
}
