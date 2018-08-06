
export default
    function flatMap<T, S>(
        iterable: Iterable<T>,
        mapper: (item: T, index: number) => Iterable<S>,
    ): Iterable<S>

export default
    function flatMap<T, S>(
        iterable: Iterable<T>,
        allowNonIterableReturn: false,
        mapper: (item: T, index: number) => Iterable<S>,
    ): Iterable<S>

export default
    function flatMap<T, S>(
        iterable: Iterable<T>,
        allowNonIterableReturn: true,
        mapper: (item: T, index: number) => S | Iterable<S>,
    ): Iterable<S>