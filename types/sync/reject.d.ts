
export default
    function reject<T>(
        iterable: Iterable<T>,
        predicate: (item: T, index: number) => any,
    ): Iterable<T>