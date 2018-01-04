import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

async function _any(iterable, predicate=x => x) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            return true
        }
    }
    return false
}

function any(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `[any] Expected all predicate to be a function`)
    assert.empty(rest, `[any] Unexpected additional arguments to all`)
    return _any(iterable, predicate)
}

export default create(any)

export { _any as plain }
