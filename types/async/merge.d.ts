import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

export default
    function merge<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        ...others: Array<AsyncOrSyncIterable<T>>,
    ): AsyncIterable<T>