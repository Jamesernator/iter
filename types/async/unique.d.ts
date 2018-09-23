import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

interface SetLike<Value> {
    add(value: Value): void
    has(value: Value): any
}

export default
    function unique<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): AsyncIterable<T>

export default
    function unique<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        set: SetLike<T>,
    ): AsyncIterable<T>
