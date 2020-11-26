import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";

const concat = iterableGenerator(
    async function* concat<T>(
        iterables: Array<AsyncOrSyncIterable<T>>,
    ): AsyncGenerator<T> {
        for await (const iterable of iterables) {
            yield* iterable as AsyncGenerator<T>;
        }
    },
);

export { concat as default };
