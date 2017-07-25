import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

const _debug = iterableGenerator(function* debug(iterable, iteratee=console.log) {
    for (const [idx, item] of enumerate(iterable)) {
        iteratee(item, idx)
        yield item
    }
})

function debug(iterable, iteratee=console.log, ...rest) {
    assert.function(iteratee, `[debug] Expected iteratee to be a function`)
    assert.empty(rest, `[debug] Unexpected additional arguments`)
    return _debug(iterable, iteratee)
}

export default create(debug)
export { _debug as raw }
