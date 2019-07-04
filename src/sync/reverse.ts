import toArray from "./toArray.js";
import iterableGenerator from "./iterableGenerator.js";

export default iterableGenerator(
    function* reverse<T>(iterable: Iterable<T>) {
        const arr = toArray(iterable)
        yield* arr.reverse()
    }
)
