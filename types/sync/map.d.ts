
export default
    function map<In, Out>(
        iterable: Iterable<In>,
        mapper?: (item: In, index: number) => Out,
    ): Iterable<Out>