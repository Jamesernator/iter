import iterableGenerator from "./iterableGenerator.js"
import enumerate from "./enumerate.js"
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

function filter<T, K extends T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => value is K),
): AsyncIterableIterator<K>;
function filter<T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => any),
): AsyncIterableIterator<T>;
async function* filter<T, K extends T = T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate:
        ((value: T, index: number) => value is K)
        | (( value: T, index: number) => any),
) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            yield item
        }
    }
}

export default iterableGenerator(filter)
