import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

type UnwrapIterable<T> = T extends AsyncOrSyncIterable<infer R> ? R : never
type UnwrappedArray<Arr> = { [P in keyof Arr]: UnwrapIterable<Arr[P]> }

export default
    // The "|" means Ts will be typed as a tuple if it can be narrowed to be so
    function zip<Ts extends Array<AsyncOrSyncIterable<any>> | [AsyncOrSyncIterable<any>]>(
        iterables: Ts
    ): AsyncIterable<UnwrappedArray<Ts>>
