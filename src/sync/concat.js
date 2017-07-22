import create from "./createIterableMethod.js"
import { raw as isIterable } from "./isIterable"

function* _concat(...iterables) {
    for (const iterable of iterables) {
        yield* iterable
    }
}

function concat(iterable, ...others) {
    assert.every(others, isIterable, `Expected iterables to concat`)
    return _concat(iterable, ...others)
}
