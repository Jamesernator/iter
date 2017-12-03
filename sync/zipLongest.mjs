import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as iterator } from "./iterator.mjs"
import { raw as isIterable } from "./isIterable.mjs"
import assert from "../--assert.mjs"

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
