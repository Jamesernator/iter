type AsyncOrSyncIterable = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable;
import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

const flatMap = iterableGenerator(
    async function* flatMap<T, R>(
        iterable: AsyncOrSyncIterable<T>,
        flatMapperFn: (value: T, index: number) => AsyncOrSyncIterable<R> | Promise<AsyncOrSyncIterable<T>>,
    ) {
        for await (const [idx, item] of enumerate(iterable)) {
            yield* await flatMapperFn(item, idx);
        }
    },
);

export { flatMap as default };
