import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

export default
    function replaceError<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        replacer: (error: any) => AsyncOrSyncIterable<T> | Promise<AsyncOrSyncIterable<T>>,
    ): AsyncIterable<T>