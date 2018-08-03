import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

export default
    function toMap<Key, Value>(
        asyncIterable: AsyncOrSyncIterable<[Key, Value, ...any[]]>,
    ): Promise<Map<Key, Value>>