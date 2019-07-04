import iterableGenerator from "./iterableGenerator.js";
import enumerate from "./enumerate.js";

export default iterableGenerator(
    function* map<T, R>(
        iterable: Iterable<T>,
        mapperFn: ((value: T, index: number) => R),
    ) {
        for (const [idx, item] of enumerate(iterable)) {
            yield mapperFn(item, idx)
        }
    }
)
