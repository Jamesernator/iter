import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

async function _all(iterable, predicate=x => x) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (!await predicate(item, idx)) {
            return false
        }
    }
    return true
}

function all(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `[all] Expected all predicate to be a function`)
    assert.empty(rest, `[all] Unexpected additional arguments to all`)
    return _all(iterable, predicate)
}

export default create(all)

export { _all as raw }
