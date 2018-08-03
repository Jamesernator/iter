import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function debug<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        iteratee?: (item: T, index: number) => void | Promise<void>,
    ): AsyncIterable<T>