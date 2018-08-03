import { AsyncOrSyncIterable } from '../AsyncOrSyncIterable'

export default
    function none<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        predicate?: (item: T, index: number) => any | Promise<any>,
    ): Promise<boolean>