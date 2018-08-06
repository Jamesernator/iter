import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";


export default
    function toArray<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Promise<Array<T>>