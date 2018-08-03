import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

// Just some overloads for the smaller number of params

export default
    function zip<Ts extends Array<AsyncOrSyncIterable<any>>>(
        ...asyncIterables: Ts,
    ): AsyncIterable<Ts>