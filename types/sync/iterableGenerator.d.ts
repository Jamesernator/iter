
export default
    function iterableGenerator<T, Args extends any[]>(
        genFunc: (...args: Args) => Iterator<T>
    ): (...args: Args) => Iterable<T>