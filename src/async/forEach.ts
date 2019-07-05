import enumerate from "./enumerate.js";

type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function forEach<T>(
    iterable: AsyncOrSyncIterable<T>,
    callback: (item: T, index: number) => any,
) {
    for await (const [idx, item] of enumerate(iterable)) {
        await callback(item, idx);
    }
}
