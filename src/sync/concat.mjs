import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import snapshotIterable from "./--snapshotIterable.mjs"
import assert from "../--assert.mjs"

const _concat = iterableGenerator(function* concat(iterables) {
    for (const iterable of iterables) {
        yield* iterable
    }
})

function concat(iterables, ...rest) {
    assert.isArray(iterables, '[concat] Expected an array of iterables to concat')
    const snapshots = iterables.map(iterable => snapshotIterable(iterable))
    assert.every(snapshots, iter => iter, `[concat] Expected only iterables to concat`)
    assert.empty(rest, `[concat] Unexpected additional arguments to concat`)
    return _concat(iterables)
}

export default concat

export { _concat as raw }
