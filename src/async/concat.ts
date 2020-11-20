import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";

const concat = iterableGenerator(
    async function* concat<T>(iterables: Array<AsyncOrSyncIterable<T>>) {
        for await (const iterable of iterables) {
            yield* iterable;
        }
    },
);

export { concat as default };
