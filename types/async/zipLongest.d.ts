import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

export default
    function zipLongest<Ts extends Array<AsyncOrSyncIterable<any>>(
        ...asyncIterables: Ts,
    ): AsyncIterable<Ts>