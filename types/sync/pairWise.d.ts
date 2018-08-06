
export default
    function pairWise<T>(
        iterable: Iterable<T>,
    ): Iterable<[T, T]>