import iterableGenerator from "./iterableGenerator.js";
import toArray from "./toArray.js";

type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

const reverse = iterableGenerator(
    async function* reverse<T>(iterable: AsyncOrSyncIterable<T>) {
        const arr = await toArray(iterable);
        yield* arr.reverse();
    },
);

export { reverse as default };
