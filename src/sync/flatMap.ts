import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

const flatMap = iterableGenerator(
    function* flatMap<T, R>(
        iterable: Iterable<T>,
        flatMapperFn: (value: T, index: number) => Iterable<R> | Iterable<R>,
    ): Generator<R> {
        for (const [idx, item] of enumerate(iterable)) {
            yield* flatMapperFn(item, idx) as Generator<R>;
        }
    },
);

export { flatMap as default };
