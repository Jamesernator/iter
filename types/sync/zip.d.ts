
export default
    function zip<Ts extends Array<Iterable<any>>>(
        ...iterables: Ts,
    ): Iterable<Ts>