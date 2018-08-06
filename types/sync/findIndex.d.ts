
export default
    function findIndex<T>(
        iterable: Iterable<T>,
    ): number

export default
    function findIndex<T>(
        iterable: Iterable<T>,
        predicate: (item: T, index: number) => any,
    ): number

export default
    function findIndex<T, Default>(
        iterable: Iterable<T>,
        defaultValue: Default,
        predicate: (item: T, index: number) => any,
    ): number | Default