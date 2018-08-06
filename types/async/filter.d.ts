import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function filter<T, K extends T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        predicate?: (item: T, index: number) => item is K,
    ): AsyncIterable<K>

export default
    function filter<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        predicate?: (item: T, index: number) => any | Promise<any>,
    ): AsyncIterable<T>