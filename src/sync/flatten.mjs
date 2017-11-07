import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as isIterable } from "./isIterable.mjs"
import assert from "../--assert.mjs"

const _flatten = iterableGenerator(function* _flatten(iterable) {
    for (const item of iterable) {
        if (!isIterable(item)) {
            throw new Error(`[flatten] Can't flatten ${ item }`)
        }
        yield* item
    }
})

function flatten(iterable, ...rest) {
    assert.empty(rest, `[flatten] Unexpected additional arguments to flatten`)
    return _flatten(iterable)
}

export default create(flatten)
export { _flatten as raw }
