import iterableGenerator from "./iterableGenerator.js";
import toArray from "./toArray.js";

const reverse = iterableGenerator(
    function* reverse<T>(iterable: Iterable<T>) {
        const arr = toArray(iterable);
        yield* arr.reverse();
    },
);

export { reverse as default };
