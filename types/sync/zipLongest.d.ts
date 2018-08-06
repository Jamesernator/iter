
export default
    function zipLongest<Ts extends Array<Iterable<any>>>(
        ...iterables: Ts,
    ): Iterable<Ts>