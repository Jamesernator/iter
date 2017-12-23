import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as iterator } from "./iterator.mjs"
import { raw as snapshotIterable } from "./snapshotIterable.mjs"
import assert from "../--assert.mjs"

// TODO: IMPLEMENT ME CORRECTLY
const _zipLongest = iterableGenerator(function* zipLongest(...iterables) {
    const iteratorsDone = new Set()
    const iterators = []
    try {
        for (const iterable of iterables) {
            iterators.push(iterator(iterable))
        }

        while (true) {
            const nexts = iterators.map(iterator => {
                if (iterator.done) {
                    return
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
            yield nexts.map(({ value, done }) => value)
        }
    } finally {
        for (const iterator of iterators) {
            iterator.close()
        }
    }
})

function zipLongest(iterable, ...others) {
    const snapshots = others.map(otherIterable => snapshotIterable(otherIterable))
    assert.every(others, iter => iter,
        `[zipLongest] Can't zipLongest with non-iterable`,
    )
    return _zipLongest(iterable, ...snapshots)
}

export default create(zipLongest)
export { _zipLongest as raw }
