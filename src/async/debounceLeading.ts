import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";

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
