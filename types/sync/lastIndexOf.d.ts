
export default
    function lastIndexOf<T>(
        asyncIterable: Iterable<T>,
        item: T,
        equality?: (item: T, otherItem: T) => any, 
    ): number | null
