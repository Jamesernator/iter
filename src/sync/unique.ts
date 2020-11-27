import iterableGenerator from "./iterableGenerator.js";

const unique = iterableGenerator(
    function* unique<T>(
        iterable: Iterable<T>,
        toKey: ((value: T) => any) = (i) => i,
    ): Generator<T> {
        const set = new Set();
        for (const item of iterable) {
            const key = toKey(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
    },
);

export { unique as default };
