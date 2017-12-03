import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as iterator } from "./iterator.mjs"
import { raw as isIterable } from "./isIterable.mjs"
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
    assert.every(others, isIterable,
        `[zip] Can't zip with non-iterable`
    )
    return _zip(iterable, ...others)
}

export default create(zip)
export { _zip as raw }
