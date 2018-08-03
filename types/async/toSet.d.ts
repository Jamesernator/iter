import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function toSet<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Set<T>