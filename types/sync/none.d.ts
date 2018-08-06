
export default
    function none<T>(
        iterable: Iterable<T>,
        predicate?: (item: T, index: number) => any,
    ): boolean