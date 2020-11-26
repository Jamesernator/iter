import iterableGenerator from "./iterableGenerator.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;


const unique = iterableGenerator(
    async function* unique<T>(
        iterable: AsyncOrSyncIterable<T>,
    ) {
        const set = new Set();
        for await (const item of iterable) {
            if (!set.has(item)) {
                set.add(item);
                yield item;
            }
        }
    },
);

export { unique as default };
