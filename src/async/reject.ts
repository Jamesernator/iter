import iterableGenerator from "./iterableGenerator.js"
import enumerate from "./enumerate.js"
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

async function* reject<T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => any),
) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (!await predicate(item, idx)) {
            yield item
        }
    }
}

export default iterableGenerator(reject)
