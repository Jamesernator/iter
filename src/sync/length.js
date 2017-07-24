import create from "./createMethod.js"
import assert from "./#assert.js"

function _length(iterable) {
    let i = 0
    for (const _ of iterable) {
        i += 1
    }
    return i
}

function length(iterable, ...rest) {
    assert.empty(rest, `[length] Unexpected additional arguments`)
    return _length(iterable)
}

export default create(length)
export { _length as raw }
