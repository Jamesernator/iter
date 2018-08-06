
export default
    function findLastIndex<T>(
        iterable: Iterable<T>,
    ): number

export default
    function findLastIndex<T>(
        iterable: Iterable<T>,
        predicate: (item: T, index: number) => any,
    ): number

export default
    function findLastIndex<T, Default>(
        iterable: Iterable<T>,
        defaultValue: Default,
        predicate: (item: T, index: number) => any,
    ): number | Default