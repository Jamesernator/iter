import iterator from "./iterator.js";

type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function reduce<T>(
    iterable: AsyncOrSyncIterable<T>,
    reducer: (accumulator: T, value: T, index: number) => T | PromiseLike<T>,
): Promise<T>;
export default async function reduce<T>(
    iterable: AsyncOrSyncIterable<T>,
    seed: T,
    reducer: (accumulator: T, value: T, index: number) => T | PromiseLike<T>,
): Promise<T>;
export default async function reduce<T, R>(
    iterable: AsyncOrSyncIterable<T>,
    seed: R,
    reducer: (accumulator: R, value: T, index: number) => R | PromiseLike<R>,
): Promise<R>;
export default async function reduce<T, R=T>(
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

        for await (const item of iter) {
            acc = await reducer(acc as T & R, item, idx);
            idx += 1;
        }
        return acc;
    } finally {
        await iter.return!();
    }
}
