import toArray from "./toArray.js";
import iterableGenerator from "./iterableGenerator.js";
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default iterableGenerator(
    async function* reverse<T>(iterable: AsyncOrSyncIterable<T>) {
        const arr = await toArray(iterable)
        yield* arr.reverse()
    }
)
