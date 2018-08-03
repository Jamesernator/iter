import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

interface ObjectMap<Value> {
    [key: string]: Value,
    [key: number]: Value,
}

export default
    function toObject<Value>(
        asyncIterable: AsyncOrSyncIterable<[string | number, Value, ...any[]]>,
    ): ObjectMap<Value>