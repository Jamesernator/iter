import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function createOperator<T, Rest extends any[], Return>(
        operator: (iterable: AsyncOrSyncIterable<T>, ...rest: Rest) => Return
    ): (asyncIterable: AsyncOrSyncIterable<T>, ...rest: Rest) => Return