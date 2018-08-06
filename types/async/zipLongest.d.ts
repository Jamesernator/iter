import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function zipLongest<Ts extends Array<AsyncOrSyncIterable<any>>>(
        ...asyncIterables: Ts,
    ): AsyncIterable<Ts>