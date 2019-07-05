import iterableGenerator from "./iterableGenerator.js";

const enumerate = iterableGenerator(
    function* enumerate<T>(iterable: Iterable<T>) {
        let idx = 0;
        for (const item of iterable) {
            yield [idx, item] as const;
            idx += 1;
        }
    },
);

export { enumerate as default };
