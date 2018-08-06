import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function find<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Promise<T>

export default
    function find<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        predicate: (item: T, index: number) => any | Promise<any>,
    ): Promise<T>

export default
    function find<T, K>(
        asyncIterable: AsyncOrSyncIterable<T>,
        defaultValue: K,
        predicate: (item: T, index: number) => any | Promise<any>,
    ): Promise<T | K>
