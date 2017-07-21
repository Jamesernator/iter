import create from "./createIterableMethod.js"
import assert from "./#assert.js"

function* _enumerate(iterable) {
    let idx = 0
    for (const item of iterable) {
        yield [idx, item]
        idx += 1
    }
}

function enumerate(iterable, ...rest) {
    assert.empty(rest, `Unexpected additional arguments to enumerate`)
    return _enumerate(iterable)
}

export default create(enumerate)

export { _enumerate as raw }
