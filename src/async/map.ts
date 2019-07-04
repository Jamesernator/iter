import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import enumerate from "./enumerate.js";

export default iterableGenerator(
    async function* map<T, R>(
        iterable: AsyncOrSyncIterable<T>,
        mapperFn: ((value: T, index: number) => R),
    ) {
        for await (const [idx, item] of enumerate(iterable)) {
            yield await mapperFn(item, idx)
        }
    }
)
