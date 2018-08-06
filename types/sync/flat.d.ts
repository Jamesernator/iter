
export default
    function flat<T>(
        iterable: Iterable<Iterable<T>>,
    ): Iterable<T>