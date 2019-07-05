import enumerate from "./enumerate.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function all<T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => any) = (x) => x,
) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (!await predicate(item, idx)) {
            return false;
        }
    }
    return true;
}
