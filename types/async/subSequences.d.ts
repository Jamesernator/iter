import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

// Just a few overloads, but more might be needed

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: 1,
    ): AsyncIterable<[T]>

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: 2,
    ): AsyncIterable<[T, T]>

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: 3,
    ): AsyncIterable<[T, T, T]>

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: 4,
    ): AsyncIterable<[T, T, T, T]>

// All the rest of the numbers

export default
    function subSequences<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        size: number,
    ): AsyncIterable<Array<T>>