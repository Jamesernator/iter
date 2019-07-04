import iterableGenerator from "./iterableGenerator.js";
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default iterableGenerator(
    function* replaceError<T>(
        iterable: Iterable<T>,
        replacer: (error: any) => Iterable<T>,
    ) {
        try {
            yield* iterable
        } catch (err) {
            yield* replacer(err)
        }
    },
)
