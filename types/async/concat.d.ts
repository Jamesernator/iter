import { AsyncOrSyncIterable } from '../AsyncOrSyncIterable'

export default
    function concat<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        ...otherAsyncIterables: Array<AsyncOrSyncIterable<T>>,
    ): AsyncIterable<T>