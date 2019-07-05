import iterableGenerator from "./iterableGenerator.js";
import iterator from "./--iterator.js";

function scan<T>(
    iterable: Iterable<T>,
    reducer: (accumulator: T, value: T, index: number) => T,
): IterableIterator<T>;
function scan<T>(
    iterable: Iterable<T>,
    seed: T,
    reducer: (accumulator: T, value: T, index: number) => T,
): IterableIterator<T>;
function scan<T, R>(
    iterable: Iterable<T>,
    seed: R,
    reducer: (accumulator: R, value: T, index: number) => R,
): IterableIterator<R>;
function* scan<T, R=T>(
    iterable: Iterable<T>,
    ...options:
    [(accumulator: T, value: T, index: number) => T]
    | [R, (accumulator: R, value: T, index: number) => R]
) {
    let reduction:
    {
        seeded: true,
        seedValue: R,
        reducer: (accumulator: R, value: T, index: number) => R,
    } | {
        seeded: false,
        reducer: (accumulator: T, value: T, index: number) => T,
    };
    if (options.length === 1) {
        reduction = {
            seeded: false,
            reducer: options[0],
        };
    } else {
        reduction = {
            seeded: true,
            seedValue: options[0],
            reducer: options[1],
        };
    }

    const iter = iterator(iterable);
    try {
        let acc;
        let idx = 0;
        if (reduction.seeded) {
            acc = reduction.seedValue;
        } else {
            const { value, done } = iter.next();
            if (done) {
                throw new Error(`[reduce] Can't reduce empty sequence with no initial value`);
            }
            acc = value;
            idx += 1;
        }

        const { reducer } = reduction;

        yield acc;
        for (const item of iter) {
            acc = reducer(acc as T & R, item, idx);
            yield acc;
            idx += 1;
        }
    } finally {
        iter.return!();
    }
}

type Scan = {
    <T>(
        iterable: Iterable<T>,
        reducer: (accumulator: T, value: T, index: number) => T,
    ): IterableIterator<T>,
    <T>(
        iterable: Iterable<T>,
        seed: T,
        reducer: (accumulator: T, value: T, index: number) => T,
    ): IterableIterator<T>,
    <T, R>(
        iterable: Iterable<T>,
        seed: R,
        reducer: (accumulator: R, value: T, index: number) => R,
    ): IterableIterator<R>,
};

export default iterableGenerator(scan) as Scan;
