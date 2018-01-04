import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"

const _enumerate = iterableGenerator(async function* enumerate(iterable) {
    let idx = 0
    for await (const item of iterable) {
        yield [idx, item]
        idx += 1
    }
})

function enumerate(iterable, ...rest) {
    assert.empty(rest, `[enumerate] Unexpected additional arguments to enumerate`)
    return _enumerate(iterable)
}

export default create(enumerate)

export { _enumerate as raw }
