
export default
    function concat<T>(
        iterable: Iterable<T>,
        ...otherIterables: Iterable<T>[],
    ): Iterable<T>