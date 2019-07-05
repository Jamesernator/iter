import iterableGenerator from "./iterableGenerator.js";
import toArray from "./toArray.js";

export default iterableGenerator(
    function* reverse<T>(iterable: Iterable<T>) {
        const arr = toArray(iterable);
        yield* arr.reverse();
    },
);
