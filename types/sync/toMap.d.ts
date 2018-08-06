
export default
    function toMap<Key, Value>(
        iterable: Iterable<[Key, Value, ...any[]]>,
    ): Map<Key, Value>