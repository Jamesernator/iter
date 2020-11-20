import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

function filter<T, K extends T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => value is K),
): AsyncGenerator<K, void>;
function filter<T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => any),
): AsyncGenerator<T, void>;
async function* filter<T, K extends T = T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate:
    ((value: T, index: number) => value is K)
    | (( value: T, index: number) => any),
) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            yield item;
        }
    }
}

type Filter = {
    <T, K extends T>(
        iterable: AsyncOrSyncIterable<T>,
        predicate: ((value: T, index: number) => value is K),
    ): AsyncIterable<K>,
    <T>(
        iterable: AsyncOrSyncIterable<T>,
        predicate: ((value: T, index: number) => any),
    ): AsyncIterable<T>,
};

export default iterableGenerator(filter) as Filter;
