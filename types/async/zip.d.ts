import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function zip<Ts extends Array<AsyncOrSyncIterable<any>>>(
        ...asyncIterables: Ts,
    ): AsyncIterable<Ts>