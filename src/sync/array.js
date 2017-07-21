import create from "./createMethod.js"
import assert from "./#assert.js"

function _array(iterable) {
    return Array.from(iterable)
}

function array(iterable, ...rest) {
    assert.empty(rest, `Unexpected additional arguments to array`)
    return _array(iterable)
}

export default create(array)

export { _array as raw }
