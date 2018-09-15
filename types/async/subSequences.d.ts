import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

// Just a few overloads, but more might be needed

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: 1,
        allowShorter?: boolean,
    ): AsyncIterable<[T]>

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: 2,
        allowShorter?: boolean,
    ): AsyncIterable<[T, T]>

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: 3,
        allowShorter?: boolean,
    ): AsyncIterable<[T, T, T]>

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: 4,
        allowShorter?: boolean,
    ): AsyncIterable<[T, T, T, T]>

// All the rest of the numbers

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: number,
        allowShorter?: boolean,
    ): AsyncIterable<Array<T>>
