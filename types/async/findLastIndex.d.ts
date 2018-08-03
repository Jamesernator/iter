import { AsyncOrSyncIterable } from "../../cjs/AsyncOrSyncIterable";

export default
    function findLastIndex<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Promise<number>

export default
    function findLastIndex<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        predicate: (item: T, index: number) => any | Promise<any>,
    ): Promise<number>

export default
    function findLastIndex<T, Default>(
        asyncIterable: AsyncOrSyncIterable<T>,
        defaultValue: Default,
        predicate: (item: T, index: number) => any | Promise<any>,
    ): Promise<number | Default>