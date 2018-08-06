
export default
    function first<T>(
        iterable: Iterable<T>,
        n?: 'single'
    ): T

export default
    function first<T>(
        iterable: Iterable<T>,
        n: number,
        allowLessThanN?: boolean,
    ): Array<T>