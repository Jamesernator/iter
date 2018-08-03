import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

export default
    function pairWise<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): AsyncIterable<[T, T]>