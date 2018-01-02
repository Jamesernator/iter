import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import snapshotIterable from "./--snapshotIterable.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

const _zip = iterableGenerator(function* zip(...iterables) {
    const iteratorsDone = new Set()
    const iterators = []
    try {
        for (const iterable of iterables) {
            iterators.push(iterator(iterable))
        }

        while (true) {
            const nexts = iterators.map(iterator => {
                if (iteratorsDone.has(iterator)) {
                    return { done: true, value: undefined }
                }
                const result = iterator.next()
                const done = result.done
                if (done) {
                    iteratorsDone.add(iterator)
                }
                return { done, value: result.value }
            })
            if (nexts.some(({ done }) => done)) {
                return
            }
            yield nexts.map(({ value }) => value)
        }
    } finally {
        for (const iterator of iterators) {
            try {
                if (!iteratorsDone.has(iterator)) {
                    iterator.close()
                }
            } catch (_) {
                /* Ensure all iterators close */
            }
        }
    }
})

function zip(iterable, ...others) {
    const snapshots = others.map(otherIterable => snapshotIterable(otherIterable))
    assert.every(
        snapshots,
        iter => iter,
        `[zip] Can't zip with non-iterable`,
    )
    return _zip(iterable, ...snapshots)
}

export default create(zip)
export { _zip as raw }
