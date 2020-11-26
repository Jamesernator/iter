import iterableGenerator from "./iterableGenerator.js";

const concat = iterableGenerator(
    function* concat<T>(
        iterables: Array<Iterable<T>>,
    ): Generator<T> {
        for (const iterable of iterables) {
            yield* iterable as Generator<T>;
        }
    },
);

export { concat as default };
