import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as isIterable } from "./isIterable.mjs"
import assert from "../--assert.mjs"

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
