import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import type { Awaitable } from "../lib/Awaitable.js";
import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

const flatMap = iterableGenerator(
    async function* flatMap<T, R>(
        iterable: AsyncOrSyncIterable<T>,
        flatMapperFn: (value: T, index: number) => Awaitable<AsyncOrSyncIterable<R>>,
    ): AsyncGenerator<R> {
        for await (const [idx, item] of enumerate(iterable)) {
            yield* await flatMapperFn(item, idx) as AsyncGenerator<R>;
        }
    },
);

export { flatMap as default };
