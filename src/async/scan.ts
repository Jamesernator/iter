import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./--iterator.js";

function scan<T>(
    iterable: AsyncOrSyncIterable<T>,
    reducer: (accumulator: T, value: T, index: number) => T | PromiseLike<T>,
): AsyncIterableIterator<T>;
function scan<T>(
    iterable: AsyncOrSyncIterable<T>,
    seed: T,
    reducer: (accumulator: T, value: T, index: number) => T | PromiseLike<T>,
): AsyncIterableIterator<T>;
function scan<T, R>(
    iterable: AsyncOrSyncIterable<T>,
    seed: R,
    reducer: (accumulator: R, value: T, index: number) => R | PromiseLike<R>,
): AsyncIterableIterator<R>;
async function* scan<T, R=T>(
    iterable: AsyncOrSyncIterable<T>,
    ...options:
    [(accumulator: T, value: T, index: number) => T | PromiseLike<T>]
    | [R, (accumulator: R, value: T, index: number) => R | PromiseLike<R>]
) {
    let reduction:
    {
        seeded: true,
        seedValue: R,
        reducer: (accumulator: R, value: T, index: number) => R | PromiseLike<R>,
    } | {
        seeded: false,
        reducer: (accumulator: T, value: T, index: number) => T | PromiseLike<T>,
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
            const { value, done } = await iter.next();
            if (done) {
                throw new Error(`[reduce] Can't reduce empty sequence with no initial value`);
            }
            acc = value;
            idx += 1;
        }

        const { reducer } = reduction;

        yield acc;
        for await (const item of iter) {
            acc = await reducer(acc as T & R, item, idx);
            yield acc;
            idx += 1;
        }
    } finally {
        await iter.return!();
    }
}

type Scan = {
    <T>(
        iterable: AsyncOrSyncIterable<T>,
        reducer: (accumulator: T, value: T, index: number) => T,
    ): AsyncIterableIterator<T>,
    <T>(
        iterable: AsyncOrSyncIterable<T>,
        seed: T,
        reducer: (accumulator: T, value: T, index: number) => T,
    ): AsyncIterableIterator<T>,
    <T, R>(
        iterable: AsyncOrSyncIterable<T>,
        seed: R,
        reducer: (accumulator: R, value: T, index: number) => R,
    ): AsyncIterableIterator<R>,
};

export default iterableGenerator(scan) as Scan;
