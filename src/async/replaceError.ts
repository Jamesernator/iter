import iterableGenerator from "./iterableGenerator.js";
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default iterableGenerator(
    async function* replaceError<T>(
        iterable: AsyncOrSyncIterable<T>,
        replacer: (error: any) => AsyncOrSyncIterable<T> | Promise<AsyncOrSyncIterable<T>>,
    ) {
        try {
            yield* iterable
        } catch (err) {
            yield* await replacer(err)
        }
    },
)
