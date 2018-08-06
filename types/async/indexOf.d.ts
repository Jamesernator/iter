import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function indexOf<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        item: T,
        equality?: (item: T, otherItem: T) => any, 
    ): Promise<number | null>
