
export default
    function merge<T>(
        iterable: Iterable<T>,
        ...others: Array<Iterable<T>>,
    ): Iterable<T>