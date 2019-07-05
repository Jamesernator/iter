import iterableGenerator from "./iterableGenerator.js";
import iterator from "./--iterator.js";

function subSequences<T>(
    iterable: Iterable<T>,
    size: 1,
    allowShorter?: false,
): IterableIterator<[T]>;
function subSequences<T>(
    iterable: Iterable<T>,
    size: 2,
    allowShorter?: false,
): IterableIterator<[T, T]>;
function subSequences<T>(
    iterable: Iterable<T>,
    size: 3,
    allowShorter?: false,
): IterableIterator<[T, T, T]>;
function subSequences<T>(
    iterable: Iterable<T>,
    size: 4,
    allowShorter?: false,
): IterableIterator<[T, T, T, T]>;
function subSequences<T>(
    iterable: Iterable<T>,
    size: number,
    allowShorter?: boolean,
): IterableIterator<Array<T>>;
function* subSequences<T>(
    iterable: Iterable<T>,
    subSequenceSize: number,
    allowShorter=false,
) {
    if (subSequenceSize < 1) {
        throw new RangeError(`[subSequences] subSequenceSize must be at least one`);
    }
    const iter = iterator(iterable);
    try {
        const buff = [];
        for (let i = 0; i < subSequenceSize; i += 1) {
            const { value, done } = iter.next();
            if (done) {
                if (allowShorter) {
                    return;
                }
                const message = `[subSequence] Can't get a subSequence of size ${ subSequenceSize } from a sequence of length ${ i }`;
                throw new Error(message);
            }
            buff.push(value);
        }

        for (const item of iter) {
            yield [...buff];
            buff.shift();
            buff.push(item);
        }
        yield [...buff];
    } finally {
        iter.return!();
    }
}

type SubSequences = {
    <T>(
        iterable: Iterable<T>,
        size: 1,
        allowShorter?: false,
    ): Iterable<[T]>,
    <T>(
        iterable: Iterable<T>,
        size: 2,
        allowShorter?: false,
    ): Iterable<[T, T]>,
    <T>(
        iterable: Iterable<T>,
        size: 3,
        allowShorter?: false,
    ): Iterable<[T, T, T]>,
    <T>(
        iterable: Iterable<T>,
        size: 4,
        allowShorter?: false,
    ): Iterable<[T, T, T, T]>,
    <T>(
        iterable: Iterable<T>,
        size: number,
        allowShorter?: boolean,
    ): Iterable<Array<T>>,
};

export default iterableGenerator(subSequences) as SubSequences;
