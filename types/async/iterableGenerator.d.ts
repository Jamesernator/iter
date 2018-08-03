
export default
    function iterableGenerator<T, Args extends any[]>(
        genFunc: (...args: Args) => AsyncIterator<T>
    ): (...args: Args) => AsyncIterable<T>