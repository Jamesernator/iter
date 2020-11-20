import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";

export default async function all<T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => any) = (x) => x,
): Promise<boolean> {
    for await (const [idx, item] of enumerate(iterable)) {
        if (!await predicate(item, idx)) {
            return false;
        }
    }
    return true;
}
