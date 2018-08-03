import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

interface MapLike<Key, Value> {
    get(key: Key): Value | undefined
    set(key: Key, value: Value): void
    has(key: Key): any
}

export default
    function groupBy<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
    ): Promise<Map<T, Array<T>>>

export default
    function groupBy<T, Key>(
        asyncIterable: AsyncOrSyncIterable<T>,
        keyFunc: (item: T, index: number) => Key | Promise<Key>,
    ): Promise<Map<Key, Array<T>>>

export default
    function groupBy<T>(
        asyncIterable: AsyncOrSyncIterable<T>,
        mapLike: MapLike<T, Array<T>>,
    ): Promise<MapLike<T, Array<T>>>

export default
    function groupBy<T, Key>(
        asyncIterable: AsyncOrSyncIterable<T>,
        mapLike: MapLike<Key, Array<T>>,
        keyFunc: (item: T, index: number) => Key | Promise<Key>,
    ): Promise<MapLike<Key, Array<T>>>