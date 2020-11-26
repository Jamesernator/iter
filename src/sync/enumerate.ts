import iterableGenerator from "./iterableGenerator.js";

const enumerate = iterableGenerator(
    function* enumerate<T>(
        iterable: Iterable<T>,
    ): Generator<[number, T]> {
        let idx = 0;
        for (const item of iterable) {
            yield [idx, item];
            idx += 1;
        }
    },
);

export { enumerate as default };
