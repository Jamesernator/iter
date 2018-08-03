import { AsyncOrSyncIterable } from "../../cjs/AsyncOrSyncIterable";

export default
    function flat<T>(
        asyncIterable: AsyncOrSyncIterable<AsyncOrSyncIterable<T>>,
    ): AsyncIterable<T>