import iterableGenerator from "./iterableGenerator.js";

const concat = iterableGenerator(
    function* concat<T>(iterables: Array<Iterable<T>>) {
        for (const iterable of iterables) {
            yield* iterable;
        }
    },
);

export { concat as default };
