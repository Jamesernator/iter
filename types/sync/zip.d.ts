
type UnwrapIterable<T> = T extends Iterable<infer R> ? R : never
type UnwrappedArray<Arr> = { [P in keyof Arr]: UnwrapIterable<Arr[P]> }

export default
    // The "|" means Ts will be typed as a tuple if it can be narrowed to be so
    function zip<Ts extends Array<Iterable<any>> | [Iterable<any>]>(
        iterables: Ts
    ): Iterable<UnwrappedArray<Ts>>
