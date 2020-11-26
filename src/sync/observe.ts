import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

const observe = iterableGenerator(
    async function* observe<T>(
        iterable: AsyncOrSyncIterable<T>,
        callback: ((value: T, index: number) => any)=console.log,
    ): AsyncGenerator<T> {
        for await (const [idx, item] of enumerate(iterable)) {
            await callback(item, idx);
            yield item;
        }
    },
);

export { observe as default };
