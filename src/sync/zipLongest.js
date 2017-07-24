import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import { raw as iterator } from "./iterator.js"
import { raw as isIterable } from "./isIterable.js"
import assert from "./#assert.js"

const _zipLongest = iterableGenerator(function* zipLongest(...iterables) {
    const iterators = iterables.map(iterator)
    while (true) {
        const nexts = iterators.map(iter => iter.next())
        if (nexts.every(({ done }) => done)) {
            return
        }
        yield nexts.map(({ value, done }) => done ? undefined : value)
    }
})

function zipLongest(iterable, ...others) {
    assert.every(others, isIterable,
        `[zipLongest] Can't zipLongest with non-iterable`
    )
    return _zipLongest(iterable, ...others)
}

export default create(zipLongest)
export { _zipLongest as raw }
