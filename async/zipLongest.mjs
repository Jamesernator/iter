import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import snapshotIterable from "./--snapshotIterable.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

const _zipLongest = iterableGenerator(async function* zipLongest(iterables) {
    const iteratorsDone = new Set()
    const iterators = []
    try {
        for (const iterable of iterables) {
            iterators.push(iterator(iterable))
        }

        while (true) {
            const nexts = await Promise.all(iterators.map(async iterator => {
                if (iteratorsDone.has(iterator)) {
                    return { done: true, value: undefined }
                }
                const result = await iterator.next()
                const done = result.done
                if (done) {
                    iteratorsDone.add(iterator)
                }
                return { done, value: result.value }
            }))
            if (nexts.every(({ done }) => done)) {
                return
            }
            yield nexts.map(({ value }) => value)
        }
    } finally {
        for (const iterator of iterators) {
            try {
                await iterator.return()
            } catch (_) {
                /* Ensure all iterators close */
            }
        }
    }
})

function zipLongest(iterables, ...rest) {
    const snapshots = iterables.map(otherIterable => snapshotIterable(otherIterable))
    assert.every(
        snapshots,
        iter => iter,
        `[zipLongest] Can't zipLongest with non-iterable`,
    )
    assert.empty(rest, `[zipLongest] Unexpected additional arguments to zipLongest`)
    return _zipLongest(iterables)
}

export default zipLongest
export { _zipLongest as raw }
