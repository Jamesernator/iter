
export default
    function enumerate<T>(
        iterable: Iterable<T>,
    ): Iterable<[number, T]>