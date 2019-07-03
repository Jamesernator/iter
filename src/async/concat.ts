import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";
import iterableGenerator from "./iterableGenerator.js";

export default iterableGenerator(
    async function* concat<T>(iterables: Array<AsyncOrSyncIterable<T>>) {
        for await (const iterable of iterables) {
            yield* iterable
        }
    }
)

