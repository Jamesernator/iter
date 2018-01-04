import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import snapshotIterable from "./--snapshotIterable.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

// TODO: Complete me

function racePromises(object) {

}

function mapObject(object, iteratee) {
    const result = {}
    for (const [key, value] of Object.entries(object)) {
        result[key] = iteratee(value)
    }
    return result
}

const _merge = iterableGenerator(async function* _merge(...iterables) {
    const iterators = { ...iterables.map(iterator) }

})

function merge(iterable, ...otherIterables) {
    const snapshots = otherIterables.map(otherIterable => snapshotIterable(otherIterable))
    assert.every(
        snapshots,
        iter => iter,
        `[merge] Can't zip with non-iterable`,
    )
    return _merge(iterable, ...snapshots)
}

export default create(merge)

export { merge as raw }
