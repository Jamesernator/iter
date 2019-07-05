import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

export default iterableGenerator(
    async function* map<T, R>(
        iterable: AsyncOrSyncIterable<T>,
        mapperFn: ((value: T, index: number) => R | Promise<R>),
    ) {
        for await (const [idx, item] of enumerate(iterable)) {
            yield await mapperFn(item, idx);
        }
    },
);
