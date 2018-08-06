
// Just a few overloads, but more might be needed

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: 1,
    ): Iterable<[T]>

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: 2,
    ): Iterable<[T, T]>

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: 3,
    ): Iterable<[T, T, T]>

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: 4,
    ): Iterable<[T, T, T, T]>

// All the rest of the numbers

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: number,
    ): Iterable<Array<T>>