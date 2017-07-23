import create from "./createMethod.js"
import assert from "./#assert.js"

function _set(iterable) {
    const s = new Set()
    for (const item of iterable) {
        s.add(item)
    }
    return s
}

function set(iterable, ...rest) {
    assert.empty(rest, `Unexpected additional arguments to set`)
    return _set(iterable)
}

export default create(set)
export { _set as raw }
