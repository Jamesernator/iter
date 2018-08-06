
export default
    function indexOf<T>(
        iterable: Iterable<T>,
        item: T,
        equality?: (item: T, otherItem: T) => any, 
    ): number | null
