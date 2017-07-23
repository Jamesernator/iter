import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import { raw as isIterable } from "./isIterable.js"
import assert from "./#assert.js"

const _flatten = iterableGenerator(function* _flatten(iterable, depth=1) {
    if (depth === 0) {
        yield* iterable
    } else {
        for (const item of iterable) {
            if (item === iterable) {
                // Don't try to reflatten something that expands to itself
                // e.g. 'a' shouldn't be flattened further
                yield item
            } else if (isIterable(item)) {
                yield* _flatten(item, depth-1)
            } else {
                yield item
            }
        }
    }
})

function flatten(iterable, depth=1, ...rest) {
    assert.number(depth, `Expected depth to be a number`)
    assert(depth >= 0, `Expected depth to be positive`)
    assert.empty(rest, `Unexpected additional arguments to flatten`)
    return _flatten(iterable, depth)
}

export default create(flatten)
export { _flatten as raw }
