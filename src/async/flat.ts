import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";

// TODO: Depth and non-iterable flattening
const flat = iterableGenerator(
    async function* flat<T>(
        iterables: AsyncOrSyncIterable<AsyncOrSyncIterable<T>>,
    ): AsyncGenerator<T> {
        for await (const iterable of iterables) {
            yield* iterable as AsyncGenerator<T>;
        }
    },
);

export { flat as default };
