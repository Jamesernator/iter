import iterableGenerator from "./iterableGenerator.js";

export default iterableGenerator(
    function* concat<T>(iterables: Array<Iterable<T>>) {
        for (const iterable of iterables) {
            yield* iterable
        }
    }
)

