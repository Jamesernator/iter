import create from "./createIterableMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

function* _map(iterable, iteratee=x => x) {
    for (const [idx, item] of enumerate(iterable)) {
        yield iteratee(item, idx)
    }
}

function map(iterable, iteratee=x => x, ...rest) {
    assert.function(iteratee, `Expected map iteratee to be a function`)
    assert.empty(rest, `Unexpected additional arguments to map`)
    return _map(iterable, iteratee)
}

export default create(map)
export { _map as raw }
