
interface MapLike<Key, Value> {
    get(key: Key): Value | undefined
    set(key: Key, value: Value): void
    has(key: Key): any
}

export default
    function countBy<T>(
        iterable: Iterable<T>,
    ): Map<T, number>

export default
    function countBy<T, Key>(
        iterable: Iterable<T>,
        keyFunc: (item: T, index: number) => Key,
    ): Map<Key, number>

export default
    function countBy<T>(
        iterable: Iterable<T>,
        mapLike: MapLike<T, number>,
    ): MapLike<T, number>

export default
    function countBy<T, Key>(
        iterable: Iterable<T>,
        mapLike: MapLike<Key, number>,
        keyFunc: (item: T, index: number) => Key,
    ): MapLike<Key, number>