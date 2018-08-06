
export default
    function forEach<T>(
        iterable: Iterable<T>,
        iteratee?: (item: T, index: number) => void,
    ): void