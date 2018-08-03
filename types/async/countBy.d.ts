import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

interface MapLike<Key, Value> {
    get(key: Key): Value | undefined
    set(key: Key, value: Value): void
    has(key: Key): any
}

export default
    function countBy<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Promise<Map<T, number>>

export default
    function countBy<T, Key>(
        asyncIterable: AsyncOrSyncIterable<T>,
        keyFunc: (item: T, index: number) => Key | Promise<Key>,
    ): Promise<Map<Key, number>>

export default
    function countBy<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        mapLike: MapLike<T, number>,
    ): Promise<MapLike<T, number>>

export default
    function countBy<T, Key>(
        asyncIterable: AsyncOrSyncIterable<T>,
        mapLike: MapLike<Key, number>,
        keyFunc: (item: T, index: number) => Key | Promise<Key>,
    ): Promise<MapLike<Key, number>>