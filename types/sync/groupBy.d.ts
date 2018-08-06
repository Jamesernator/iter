
interface MapLike<Key, Value> {
    get(key: Key): Value | undefined
    set(key: Key, value: Value): void
    has(key: Key): any
}

export default
    function groupBy<T>(
        iterable: Iterable<T>,
    ): Map<T, Array<T>>

export default
    function groupBy<T, Key>(
        iterable: Iterable<T>,
        keyFunc: (item: T, index: number) => Key,
    ): Map<Key, Array<T>>

export default
    function groupBy<T>(
        iterable: Iterable<T>,
        mapLike: MapLike<T, Array<T>>,
    ): MapLike<T, Array<T>>

export default
    function groupBy<T, Key>(
        iterable: Iterable<T>,
        mapLike: MapLike<Key, Array<T>>,
        keyFunc: (item: T, index: number) => Key,
    ): MapLike<Key, Array<T>>