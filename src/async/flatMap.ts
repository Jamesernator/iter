import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

export default iterableGenerator(
    async function* flatMap<T, R>(
        iterable: AsyncOrSyncIterable<T>,
        flatMapperFn: (value: T, index: number) => AsyncOrSyncIterable<R> | Promise<AsyncOrSyncIterable<T>>,
    ) {
        for await (const [idx, item] of enumerate(iterable)) {
            yield* await flatMapperFn(item, idx);
        }
    },
);
