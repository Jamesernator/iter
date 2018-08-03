import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function reject<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        predicate: (item: T, index: number) => any | Promise<any>,
    ): AsyncIterable<T>