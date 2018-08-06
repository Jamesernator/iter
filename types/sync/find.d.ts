
export default
    function find<T>(
        iterable: Iterable<T>,
    ): T

export default
    function find<T>(
        iterable: Iterable<T>,
        predicate: (item: T, index: number) => any,
    ): T

export default
    function find<T, K>(
        iterable: Iterable<T>,
        defaultValue: K,
        predicate: (item: T, index: number) => any,
    ): T | K
