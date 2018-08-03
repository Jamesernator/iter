import { AsyncOrSyncIterable } from '../AsyncOrSyncIterable'

export default
    function concat<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        ...otherAsyncIterables: AsyncOrSyncIterable<T>[],
    ): AsyncIterable<T>