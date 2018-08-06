import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function flat<T>(
        asyncIterable: AsyncOrSyncIterable<AsyncOrSyncIterable<T>>,
    ): AsyncIterable<T>