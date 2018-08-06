
interface ObjectMap<Value> {
    [key: string]: Value,
    [key: number]: Value,
}

export default
    function toObject<Value>(
        iterable: Iterable<[string | number, Value, ...any[]]>,
    ): ObjectMap<Value>