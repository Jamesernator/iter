import enumerate from "./enumerate.js";

export default function forEach<T>(
    iterable: Iterable<T>,
    callback: (item: T, index: number) => any,
) {
    for (const [idx, item] of enumerate(iterable)) {
        callback(item, idx);
    }
}
