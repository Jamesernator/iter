type AsyncOrSyncIterable = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable;
import iterableGenerator from "./iterableGenerator.js";

const enumerate = iterableGenerator(async function* enumerate<T>(iterable: AsyncOrSyncIterable<T>) {
    let idx = 0;
    for await (const item of iterable) {
        yield [idx, item] as const;
        idx += 1;
    }
});

export { enumerate as default };
