import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as snapshotIterable } from "./snapshotIterable.mjs"
import assert from "../--assert.mjs"

const _flatten = iterableGenerator(function* _flatten(iterable) {
    for (const item of iterable) {
        const snapshot = snapshotIterable(item)
        if (!snapshot) {
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
