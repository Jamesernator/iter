import iterableGenerator from "./iterableGenerator.js";

// TODO: Depth and non-iterable flattening
const flat = iterableGenerator(
    function* flat<T>(
        iterables: Iterable<Iterable<T>>,
    ): Generator<T> {
        for (const iterable of iterables) {
            yield* iterable as Generator<T>;
        }
    },
);

export { flat as default };
