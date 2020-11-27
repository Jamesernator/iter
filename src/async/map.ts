import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import type { Awaitable } from "../lib/Awaitable.js";
import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

const map = iterableGenerator(
    async function* map<T, R>(
        iterable: AsyncOrSyncIterable<T>,
        mapperFn: ((value: T, index: number) => Awaitable<R>),
    ): AsyncGenerator<R> {
        for await (const [idx, item] of enumerate(iterable)) {
            yield await mapperFn(item, idx);
        }
    },
);

export { map as default };
