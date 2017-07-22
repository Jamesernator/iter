import create from "./createMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

/* eslint-disable no-empty-function */
function _forEach(iterable, iteratee=_ => {}) {
    for (const [idx, item] of enumerate(iterable)) {
        iteratee(item, idx)
    }
}

function forEach(iterable, iteratee=_ => {}, ...rest) {
    assert.function(iteratee, `Expected function to forEach`)
    assert.empty(rest, `Unexpected additional arguments to forEach`)
    return _forEach(iterable, iteratee)
}

export default create(forEach)
export { _forEach as raw }
