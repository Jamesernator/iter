import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import assert from "./#assert.js"

const _replaceError = iterableGenerator(function* replaceError(iterable, replacer) {
    try {
        yield* iterable
    } catch (err) {
        yield* replacer(err)
    }
})

function replaceError(iterable, replacer, ...rest) {
    assert.function(replacer, `[replaceError] Expected replacer to be a function`)
    assert.empty(rest, `[replaceError] Unexpected additional arguments`)
    return _replaceError(iterable, replacer)
}

export default create(replaceError)
export { _replaceError as raw }
