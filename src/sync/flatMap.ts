import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

export default iterableGenerator(
    function* flatMap<T, R>(
        iterable: Iterable<T>,
        flatMapperFn: (value: T, index: number) => Iterable<R>,
    ) {
        for (const [idx, item] of enumerate(iterable)) {
            yield* flatMapperFn(item, idx);
        }
    },
);
