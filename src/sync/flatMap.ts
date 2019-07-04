import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import enumerate from "./enumerate.js";

export default iterableGenerator(
    function* flatMap<T, R>(
        iterable: Iterable<T>,
        flatMapperFn: (value: T, index: number) => Iterable<R>,
    ) {
        for (const [idx, item] of enumerate(iterable)) {
            yield* flatMapperFn(item, idx);
        }
    }
)
