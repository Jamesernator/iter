import iterableGenerator from "./iterableGenerator.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

const concat = iterableGenerator(
    async function* concat<T>(iterables: Array<AsyncOrSyncIterable<T>>) {
        for await (const iterable of iterables) {
            yield* iterable;
        }
    },
);

export { concat as default };
