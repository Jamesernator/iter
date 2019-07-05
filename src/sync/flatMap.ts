import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

const flatMap = iterableGenerator(
    function* flatMap<T, R>(
        iterable: Iterable<T>,
        flatMapperFn: (value: T, index: number) => Iterable<R>,
    ) {
        for (const [idx, item] of enumerate(iterable)) {
            yield* flatMapperFn(item, idx);
        }
    },
);

export { flatMap as default };
