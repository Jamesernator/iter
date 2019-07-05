import iterableGenerator from "./iterableGenerator.js";

const flat = iterableGenerator(
    function* flat<T>(iterable: Iterable<Iterable<T>>) {
        for (const item of iterable) {
            yield* item;
        }
    },
);

export { flat as default };
