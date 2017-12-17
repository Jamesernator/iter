import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as iterator } from "./iterator.mjs"
import { raw as snapshotIterable } from "./snapshotIterable.mjs"
import close from "./--close.mjs"
import assert from "../--assert.mjs"

const _zip = iterableGenerator(function* zip(...iterables) {
    const iterators = iterables.map(iterator)
    while (true) {
        const nexts = iterators.map(iter => iter.next())
        if (nexts.some(({ done }) => done)) {
            iterators.forEach(iter => close(iter))
            return
        }
        yield nexts.map(({ value }) => value)
    }
})

function zip(iterable, ...others) {
    const snapshots = others.map(otherIterable => snapshotIterable(otherIterable))
    assert.every(others, iter => iter,
        `[zip] Can't zip with non-iterable`,
    )
    return _zip(iterable, ...snapshots)
}

export default create(zip)
export { _zip as raw }
