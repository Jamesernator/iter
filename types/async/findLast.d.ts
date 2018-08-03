import { AsyncOrSyncIterable } from "../../cjs/AsyncOrSyncIterable";

export default
    function findLast<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Promise<T>

export default
    function findLast<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        predicate: (item: T, index: number) => any | Promise<any>,
    ): Promise<T>

export default
    function findLast<T, K>(
        asyncIterable: AsyncOrSyncIterable<T>,
        defaultValue: K,
        predicate: (item: T, index: number) => any | Promise<any>,
    ): Promise<T | K>
