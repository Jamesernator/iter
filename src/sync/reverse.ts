import iterableGenerator from "./iterableGenerator.js";
import toArray from "./toArray.js";

const reverse = iterableGenerator(
    function* reverse<T>(
        iterable: Iterable<T>,
    ): Generator<T> {
        const arr = toArray(iterable);
        yield* arr.reverse() as unknown as Generator<T>;
    },
);

export { reverse as default };
