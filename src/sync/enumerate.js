import create from "./createIterableMethod.js"
import assert from "./#assert.js"

function* enumerate(iterable, ...rest) {
    assert.empty(rest, `Unexpected additional arguments to enumerate`)
    let idx = 0
    for (const item of iterable) {
        yield [idx, item]
        idx += 1
    }
}

export default create(enumerate)

export { enumerate as plain }
