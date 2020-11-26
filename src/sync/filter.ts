import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

function filter<T, K extends T>(
    iterable: Iterable<T>,
    predicate: ((value: T, index: number) => value is K),
): Generator<K, void>;
function filter<T>(
    iterable: Iterable<T>,
    predicate: ((value: T, index: number) => any),
): Generator<T, void>;
function* filter<T, K extends T = T>(
    iterable: Iterable<T>,
    predicate:
    ((value: T, index: number) => value is K)
    | (( value: T, index: number) => any),
): Generator<T, void> {
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            yield item;
        }
    }
}

type Filter = {
    <T, K extends T>(
        iterable: Iterable<T>,
        predicate: ((value: T, index: number) => value is K),
    ): Iterable<K>,
    <T>(
        iterable: Iterable<T>,
        predicate: ((value: T, index: number) => any),
    ): Iterable<T>,
};

export default iterableGenerator(filter) as Filter;
