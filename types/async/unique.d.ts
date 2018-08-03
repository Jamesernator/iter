import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

interface SetLike<Value> {
    add(value: Value): void
    has(value: Value): any
}

export default
    function unique<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Set<T>

export default
    function unique<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        set: SetLike<T>,
    ): SetLike<T>