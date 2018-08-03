import { AsyncOrSyncIterable } from "../../cjs/AsyncOrSyncIterable";

export default
    function lastIndexOf<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        item: T,
        equality?: (item: T, otherItem: T) => any, 
    ): Promise<number | null>
