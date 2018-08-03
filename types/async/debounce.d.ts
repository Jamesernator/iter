import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function debounce<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        time: number,
        trailing?: boolean
    ): AsyncIterable<T>