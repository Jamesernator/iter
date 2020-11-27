import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

const observe = iterableGenerator(
    function* observe<T>(
        iterable: Iterable<T>,
        callback: ((value: T, index: number) => any)=console.log,
    ): Generator<T> {
        for (const [idx, item] of enumerate(iterable)) {
            callback(item, idx);
            yield item;
        }
    },
);

export { observe as default };
