import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

async function _indexOf(iterable, searchItem, equality=Object.is) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (equality(item, searchItem)) {
            return idx
        }
    }
    return null
}

function indexOf(iterable, searchItem, equality=Object.is, ...rest) {
    assert.function(equality, `[indexOf] Expected equality to be a function`)
    assert.empty(rest, `[indexOf] Unexpected additional arguments`)
    return _indexOf(iterable, searchItem, equality)
}

export default create(indexOf)
export { _indexOf as raw }
