import iterableGenerator from "./iterableGenerator.js";

const replaceError = iterableGenerator(
    function* replaceError<T>(
        iterable: Iterable<T>,
        replacer: (error: any) => Iterable<T>,
    ) {
        try {
            yield* iterable;
        } catch (err) {
            yield* replacer(err);
        }
    },
);

export { replaceError as default };
