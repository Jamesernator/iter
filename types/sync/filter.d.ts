
export default
    function filter<T, K extends T>(
        iterable: Iterable<T>,
        predicate?: (item: T, index: number) => item is K,
    ): Iterable<K>

export default
    function filter<T>(
        iterable: Iterable<T>,
        predicate?: (item: T, index: number) => any,
    ): Iterable<T>