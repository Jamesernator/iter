import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

/* global console */

export default iterableGenerator(
    function* observe<T>(
        iterable: Iterable<T>,
        callback: ((value: T, index: number) => any)=console.log,
    ) {
        for (const [idx, item] of enumerate(iterable)) {
            callback(item, idx);
            yield item;
        }
    },
);
