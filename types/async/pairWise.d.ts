import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function pairWise<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        allowShorter?: boolean,
    ): AsyncIterable<[T, T]>
