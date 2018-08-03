import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function contains<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        item: T,
        equality?: (item: T, otherItem: T) => any,
    ): Promise<boolean>