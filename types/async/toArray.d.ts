import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";


export default
    function toArray<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Promise<Array<T>>