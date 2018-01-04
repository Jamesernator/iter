import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import snapshotIterable from "./--snapshotIterable.mjs"
import assert from "../--assert.mjs"

const _concat = iterableGenerator(async function* concat(...iterables) {
    for await (const iterable of iterables) {
        yield* iterable
    }
})

function concat(iterable, ...others) {
    const snapshots = others.map(other => snapshotIterable(other))
    assert.every(snapshots, iter => iter, `[concat] Expected iterables to concat`)
    return _concat(iterable, ...snapshots)
}

export default create(concat)

export { _concat as raw }