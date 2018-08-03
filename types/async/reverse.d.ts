import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

export default
    function reverse<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): AsyncIterable<T>