import iterableGenerator from "./iterableGenerator.js";

type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

const flat = iterableGenerator(
    async function* flat<T>(iterable: AsyncOrSyncIterable<AsyncOrSyncIterable<T>>) {
        for await (const item of iterable) {
            yield* item;
        }
    },
);

export { flat as default };
