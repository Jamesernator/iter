import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

async function _none(iterable, predicate=x => x) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            return false
        }
    }
    return true
}

function none(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `[none] Expected none predicate to be a function`)
    assert.empty(rest, `[none] Unexpected additional arguments to none`)
    return _none(iterable, predicate)
}

export default create(none)

export { _none as raw }
