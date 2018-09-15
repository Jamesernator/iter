import { AsyncOrSyncIterable } from '../AsyncOrSyncIterable'

export default
    function concat<T>(
        ...asyncIterables: Array<AsyncOrSyncIterable<T>>,
    ): AsyncIterable<T>
