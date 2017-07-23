import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

const _filter = iterableGenerator(function* filter(iterable, predicate=x => x) {
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            yield item
        }
    }
})

function filter(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `Expected filter predicate to be a function`)
    assert.empty(rest, `Unexpected additional arguments to map`)
    return _filter(iterable, predicate)
}

export default create(filter)
export { _filter as raw }
