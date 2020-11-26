import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";

const unique = iterableGenerator(
    async function* unique<T>(
        iterable: AsyncOrSyncIterable<T>,
        toKey: ((value: T) => any) = (i) => i,
    ): AsyncGenerator<T> {
        const set = new Set();
        for await (const item of iterable) {
            const key = toKey(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
    },
);

export { unique as default };
