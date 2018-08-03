import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function enumerate<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): AsyncIterable<[number, T]>