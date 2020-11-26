import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

function subSequences<T>(
    iterable: AsyncOrSyncIterable<T>,
    size: 1,
    allowShorter?: false,
): AsyncGenerator<[T], void>;
function subSequences<T>(
    iterable: AsyncOrSyncIterable<T>,
    size: 2,
    allowShorter?: false,
): AsyncGenerator<[T, T], void>;
function subSequences<T>(
    iterable: AsyncOrSyncIterable<T>,
    size: 3,
    allowShorter?: false,
): AsyncGenerator<[T, T, T], void>;
function subSequences<T>(
    iterable: AsyncOrSyncIterable<T>,
    size: 4,
    allowShorter?: false,
): AsyncGenerator<[T, T, T, T], void>;
function subSequences<T>(
    iterable: AsyncOrSyncIterable<T>,
    size: number,
    allowShorter?: boolean,
): AsyncGenerator<Array<T>, void>;
async function* subSequences<T>(
    iterable: AsyncOrSyncIterable<T>,
    subSequenceSize: number,
    allowShorter=false,
): AsyncGenerator<Array<T>, void> {
    if (subSequenceSize < 1) {
        throw new RangeError(`[subSequences] subSequenceSize must be at least one`);
    }
    const iter = iterator(iterable);
    try {
        const buff: Array<T> = [];
        for (let i = 0; i < subSequenceSize; i += 1) {
            const res = await iter.next();
            if (res.done) {
                if (allowShorter) {
                    return;
                }
                const message = `[subSequence] Can't get a subSequence of size ${ subSequenceSize } from a sequence of length ${ i }`;
                throw new Error(message);
            }
            buff.push(res.value);
        }

        for await (const item of iter) {
            yield [...buff];
            buff.shift();
            buff.push(item);
        }
        yield [...buff];
    } finally {
        await iter.return();
    }
}

type SubSequences = {
    <T>(
        iterable: AsyncOrSyncIterable<T>,
        size: 1,
        allowShorter?: false,
    ): AsyncIterable<[T]>,
    <T>(
        iterable: AsyncOrSyncIterable<T>,
        size: 2,
        allowShorter?: false,
    ): AsyncIterable<[T, T]>,
    <T>(
        iterable: AsyncOrSyncIterable<T>,
        size: 3,
        allowShorter?: false,
    ): AsyncIterable<[T, T, T]>,
    <T>(
        iterable: AsyncOrSyncIterable<T>,
        size: 4,
        allowShorter?: false,
    ): AsyncIterable<[T, T, T, T]>,
    <T>(
        iterable: AsyncOrSyncIterable<T>,
        size: number,
        allowShorter?: boolean,
    ): AsyncIterable<Array<T>>,
};

export default iterableGenerator(subSequences) as SubSequences;
