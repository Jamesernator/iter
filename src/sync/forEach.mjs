import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

/* eslint-disable no-empty-function */
function _forEach(iterable, iteratee=_ => {}) {
    for (const [idx, item] of enumerate(iterable)) {
        iteratee(item, idx)
    }
}

function forEach(iterable, iteratee=_ => {}, ...rest) {
    assert.function(iteratee, `[forEach] Expected function to forEach`)
    assert.empty(rest, `[forEach] Unexpected additional arguments to forEach`)
    return _forEach(iterable, iteratee)
}

export default create(forEach)
export { _forEach as raw }
