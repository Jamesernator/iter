
export default
    function last<T>(
        iterable: Iterable<T>,
        n?: 'single'
    ): T

export default
    function last<T>(
        iterable: Iterable<T>,
        n: number,
        allowLessThanN?: boolean,
    ): Array<T>