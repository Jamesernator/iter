import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import toArray from "./toArray.js";

export default iterableGenerator(
    async function* reverse<T>(iterable: AsyncOrSyncIterable<T>) {
        const arr = await toArray(iterable);
        yield* arr.reverse();
    },
);
