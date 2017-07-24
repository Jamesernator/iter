import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import { raw as iterator } from "./iterator.js"
import { raw as isIterable } from "./isIterable.js"
import close from "./#close.js"
import assert from "./#assert.js"

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
