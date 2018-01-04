import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as toArray } from "./toArray.mjs"
import assert from "../--assert.mjs"

const _reverse = iterableGenerator(async function* reverse(iterable) {
    const arr = await toArray(iterable)
    yield* arr.reverse()
})

function reverse(iterable, ...rest) {
    assert.empty(rest, `[reverse] Unexpected additional arguments`)
    return _reverse(iterable)
}

export default create(reverse)
export { _reverse as raw }
