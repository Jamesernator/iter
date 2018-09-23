
interface SetLike<Value> {
    add(value: Value): void
    has(value: Value): any
}

export default
    function unique<T>(
        iterable: Iterable<T>,
    ): Iterable<T>

export default
    function unique<T>(
        iterable: Iterable<T>,
        set: SetLike<T>,
    ): Iterable<T>
