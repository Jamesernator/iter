import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function map<In, Out>(
        asyncIterable: AsyncOrSyncIterable<In>,
        mapperFn: (item: In, index: number) => Out | Promise<Out>,
    ): AsyncIterable<Out>
