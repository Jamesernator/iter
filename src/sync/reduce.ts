import iterator from "./--iterator.js";

export default function reduce<T>(
    iterable: Iterable<T>,
    reducer: (accumulator: T, value: T, index: number) => T,
): T;
export default function reduce<T>(
    iterable: Iterable<T>,
    seed: T,
    reducer: (accumulator: T, value: T, index: number) => T,
): T;
export default function reduce<T, R>(
    iterable: Iterable<T>,
    seed: R,
    reducer: (accumulator: R, value: T, index: number) => R,
): R;
export default function reduce<T, R=T>(
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

        for (const item of iter) {
            acc = reducer(acc as T & R, item, idx);
            idx += 1;
        }
        return acc;
    } finally {
        iter.return!();
    }
}
