
export default
    function pairWise<T>(
        iterable: Iterable<T>,
        allowShorter?: boolean,
    ): Iterable<[T, T]>
