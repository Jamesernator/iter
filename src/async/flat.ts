import iterableGenerator from "./iterableGenerator.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

// TODO: Depth and non-iterable flattening
const flat = iterableGenerator(
    async function* flat<T>(iterables: AsyncOrSyncIterable<AsyncOrSyncIterable<T>>) {
        for await (const iterable of iterables) {
            yield* iterable;
        }
    },
);

export { flat as default };
