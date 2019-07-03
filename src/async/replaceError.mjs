import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"

const _replaceError = iterableGenerator(
    async function* replaceError(iterable, replacer) {
        try {
            yield* iterable
        } catch (err) {
            yield* await replacer(err)
        }
    },
)

function replaceError(iterable, replacer, ...rest) {
    assert.function(replacer, `[replaceError] Expected replacer to be a function`)
    assert.empty(rest, `[replaceError] Unexpected additional arguments`)
    return _replaceError(iterable, replacer)
}

export default create(replaceError)
export { _replaceError as raw }
