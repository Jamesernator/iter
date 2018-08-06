import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function flatMap<T, S>(
        asyncIterable: AsyncOrSyncIterable<T>,
        mapper: (item: T, index: number) => AsyncOrSyncIterable<S> | Promise<AsyncOrSyncIterable<S>>,
    ): AsyncIterable<S>

export default
    function flatMap<T, S>(
        asyncIterable: AsyncOrSyncIterable<T>,
        allowNonIterableReturn: false,
        mapper: (item: T, index: number) => AsyncOrSyncIterable<S> | Promise<AsyncOrSyncIterable<S>>,
    ): AsyncIterable<S>

export default
    function flatMap<T, S>(
        asyncIterable: AsyncOrSyncIterable<T>,
        allowNonIterableReturn: true,
        mapper: (item: T, index: number) => S | AsyncOrSyncIterable<S> | Promise<AsyncOrSyncIterable<S>>
    ): AsyncIterable<S>