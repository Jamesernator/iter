
export default
    function any<T>(
        iterable: Iterable<T>,
        predicate?: (item: T, index: number) => any,
    ): boolean