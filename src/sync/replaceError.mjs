import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"

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
