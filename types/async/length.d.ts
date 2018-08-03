import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function length<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Promise<number>