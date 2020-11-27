import iterableGenerator from "./iterableGenerator.js";

const replaceError = iterableGenerator(
    function* replaceError<T>(
        iterable: Iterable<T>,
        replacer: (error: any) => Iterable<T>,
    ): Generator<T> {
        try {
            yield* iterable as Generator<T>;
        } catch (err: any) {
            yield* replacer(err) as Generator<T>;
        }
    },
);

export { replaceError as default };
