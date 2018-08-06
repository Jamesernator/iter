
interface SetLike<Value> {
    add(value: Value): void
    has(value: Value): any
}

export default
    function unique<T>(
        iterable: Iterable<T>,
    ): Set<T>

export default
    function unique<T>(
        iterable: Iterable<T>,
        set: SetLike<T>,
    ): SetLike<T>