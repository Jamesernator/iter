import { AsyncOrSyncIterable } from '../AsyncOrSyncIterable'

export default
    function all<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        predicate?: (item: T, index: number) => any | Promise<any>,
    ): Promise<boolean>