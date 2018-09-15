
// Just a few overloads, but more might be needed

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: 1,
        allowShorter?: boolean,
    ): Iterable<[T]>

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: 2,
        allowShorter?: boolean,
    ): Iterable<[T, T]>

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: 3,
        allowShorter?: boolean,
    ): Iterable<[T, T, T]>

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: 4,
        allowShorter?: boolean,
    ): Iterable<[T, T, T, T]>

// All the rest of the numbers

export default
    function subSequences<T>(
        iterable: Iterable<T>,
        size: number,
        allowShorter?: boolean,
    ): Iterable<Array<T>>
