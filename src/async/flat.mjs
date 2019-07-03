import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import snapshotIterable from "./--snapshotIterable.mjs"
import assert from "../--assert.mjs"

const _flat = iterableGenerator(async function* _flat(iterable) {
    for await (const item of iterable) {
        const snapshot = snapshotIterable(item)
        if (!snapshot) {
            throw new Error(`[flat] Can't flat ${ item }`)
        }
        yield* item
    }
})

function flat(iterable, ...rest) {
    assert.empty(rest, `[flat] Unexpected additional arguments to flat`)
    return _flat(iterable)
}

export default create(flat)
export { _flat as raw }
