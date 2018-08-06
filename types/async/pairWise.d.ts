import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function pairWise<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): AsyncIterable<[T, T]>