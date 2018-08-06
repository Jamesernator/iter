
export default 
    function all<T>(
        iterable: Iterable<T>,
        predicate?: (item: T, index: number) => any ,
    ): boolean