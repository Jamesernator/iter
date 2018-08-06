
export default
    function replaceError<T>(
        iterable: Iterable<T>,
        replacer: (error: any) => Iterable<T>,
    ): Iterable<T>