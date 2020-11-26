import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";

export default async function forEach<T>(
    iterable: AsyncOrSyncIterable<T>,
    callback: (item: T, index: number) => any,
): Promise<void> {
    for await (const [idx, item] of enumerate(iterable)) {
        await callback(item, idx);
    }
}
