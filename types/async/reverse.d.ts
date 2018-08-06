import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function reverse<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): AsyncIterable<T>