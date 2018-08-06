
export default
    function createOperator<T, Rest extends any[], Return>(
        operator: (iterable: Iterable<T>, ...rest: Rest) => Return
    ): (iterable: Iterable<T>, ...rest: Rest) => Return