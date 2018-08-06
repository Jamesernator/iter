
export default
    function findLast<T>(
        iterable: Iterable<T>,
    ): T

export default
    function findLast<T>(
        iterable: Iterable<T>,
        predicate: (item: T, index: number) => any,
    ): T

export default
    function findLast<T, K>(
        iterable: Iterable<T>,
        defaultValue: K,
        predicate: (item: T, index: number) => any,
    ): T | K
