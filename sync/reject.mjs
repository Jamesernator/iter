import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

const _reject = iterableGenerator(function* reject(iterable, predicate=x => x) {
    for (const [idx, item] of enumerate(iterable)) {
        if (!predicate(item, idx)) {
            yield item
        }
    }
})

function reject(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `Expected reject predicate to be a function`)
    assert.empty(rest, `Unexpected additional arguments to map`)
    return _reject(iterable, predicate)
}

export default create(reject)
export { _reject as raw }
