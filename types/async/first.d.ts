import { AsyncOrSyncIterable } from "../../cjs/AsyncOrSyncIterable";

export default
    function first<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        n?: 'single'
    ): Promise<T>

export default
    function first<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        n: number,
        allowLessThanN?: boolean,
    ): Promise<Array<T>>