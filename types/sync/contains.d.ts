
export default
    function contains<T>(
        iterable: Iterable<T>,
        item: T,
        equality?: (item: T, otherItem: T) => any,
    ): boolean