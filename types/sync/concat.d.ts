
export default
    function concat<T>(
        iterable: Iterable<T>,
        ...otherIterables: Array<Iterable<T>>,
    ): Iterable<T>