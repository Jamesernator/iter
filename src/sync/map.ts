import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

const map = iterableGenerator(
    function* map<T, R>(
        iterable: Iterable<T>,
        mapperFn: ((value: T, index: number) => R),
    ) {
        for (const [idx, item] of enumerate(iterable)) {
            yield mapperFn(item, idx);
        }
    },
);

export { map as default };
