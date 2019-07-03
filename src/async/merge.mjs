import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import snapshotIterable from "./--snapshotIterable.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

function racePromises(object) {
    const promises = Object.entries(object).map(([key, promise]) => {
        return Promise.resolve(promise).then(value => {
            return { key, value }
        })
    })
    return Promise.race(promises)
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
    const waiting = mapObject(iterators, i => i.next())
    while (Object.keys(iterators).length > 0) {
        const { key, value: { value, done } } = await racePromises(waiting)
        if (done) {
            delete iterators[key]
        } else {
            yield value
            waiting[key] = iterators[key].next()
        }
    }
})

// TODO: Make this non-variadic

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
