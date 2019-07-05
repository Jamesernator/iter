import iterableGenerator from "./iterableGenerator.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

const debounceLeading = iterableGenerator(
    async function* debounceLeading<T>(
        iterable: AsyncOrSyncIterable<T>,
        time: number,
    ) {
        let previousTime = -Infinity;
        for await (const item of iterable) {
            const now = Date.now();
            if (now - previousTime > time) {
                yield item;
            }
            previousTime = now;
        }
    },
);

export { debounceLeading as default };
