import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

const _filter = iterableGenerator(async function* filter(iterable, predicate=x => x) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            yield item
        }
    }
})

function filter(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `[filter] Expected filter predicate to be a function`)
    assert.empty(rest, `[filter] Unexpected additional arguments to map`)
    return _filter(iterable, predicate)
}

export default create(filter)
export { _filter as raw }
