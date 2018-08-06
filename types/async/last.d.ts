import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function last<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        n?: 'single'
    ): Promise<T>

export default
    function last<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        n: number,
        allowLessThanN?: boolean,
    ): Promise<Array<T>>