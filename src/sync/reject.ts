import iterableGenerator from "./iterableGenerator.js"
import enumerate from "./enumerate.js"

function* reject<T>(
    iterable: Iterable<T>,
    predicate: ((value: T, index: number) => any),
) {
    for  (const [idx, item] of enumerate(iterable)) {
        if (!predicate(item, idx)) {
            yield item
        }
    }
}

export default iterableGenerator(reject)
