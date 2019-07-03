import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

async function _lastIndexOf(iterable, searchItem, equality=Object.is) {
    let foundIdx
    let foundSet = false
    for await (const [idx, item] of enumerate(iterable)) {
        if (equality(item, searchItem)) {
            foundIdx = idx
            foundSet = true
        }
    }
    if (foundSet) {
        return foundIdx
    } else {
        return null
    }
}

function lastIndexOf(iterable, searchItem, equality=Object.is, ...rest) {
    assert.function(equality, `[lastIndexOf] Expected equality to be a function`)
    assert.empty(rest, `[lastIndexOf] Unexpected additional arguments`)
    return _lastIndexOf(iterable, searchItem, equality)
}

export default create(lastIndexOf)
export { _lastIndexOf as raw }
