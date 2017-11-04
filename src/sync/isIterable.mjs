import portable from "../--portable.mjs"
import assert from "../--assert.mjs"

function _isIterable(maybeIterable) {
    return maybeIterable != null
        && typeof maybeIterable[Symbol.iterator] === 'function'
}

function isIterable(maybeIterable, ...rest) {
    assert.empty(rest, `[isIterable] Unexpected additional arguments to isIterable`)
    return _isIterable(maybeIterable)
}

export default portable(isIterable)

export { _isIterable as raw }
