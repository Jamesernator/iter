import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import { raw as isIterable } from "./isIterable"
import assert from "./#assert.js"

const _concat = iterableGenerator(function* concat(...iterables) {
    for (const iterable of iterables) {
        yield* iterable
    }
})

function concat(iterable, ...others) {
    assert.every(others, isIterable, `[concat] Expected iterables to concat`)
    return _concat(iterable, ...others)
}

export default create(concat)

export { _concat as raw }
