
export default
    function debug<T>(
        iterable: Iterable<T>,
        iteratee?: (item: T, index: number) => void,
    ): Iterable<T>