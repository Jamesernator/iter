import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

const reject = iterableGenerator(
    function* reject<T>(
        iterable: Iterable<T>,
        predicate: ((value: T, index: number) => any),
    ): Generator<T> {
        for (const [idx, item] of enumerate(iterable)) {
            if (!predicate(item, idx)) {
                yield item;
            }
        }
    },
);

export { reject as default };

