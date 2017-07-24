import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import { raw as array } from "./array.js"
import assert from "./#assert.js"

const _reverse = iterableGenerator(function* reverse(iterable) {
    const arr = array(iterable)
    yield* arr.reverse()
})

function reverse(iterable, ...rest) {
    assert.empty(rest, `[reverse] Unexpected additional arguments`)
    return _reverse(iterable)
}

export default create(reverse)
export { _reverse as raw }
