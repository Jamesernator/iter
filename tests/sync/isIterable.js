import test from "ava"
import isIterable from "../../src/sync/isIterable.mjs"

test('isIterable basic functionality', t => {
    const a = [1, 2, 3, 4]

    const gen = function* () {
        yield 1
        yield 2
    }

    const custom = {
        [Symbol.iterator]() {
            return {
                next() {
                    return { done: true, value: 10 }
                },
            }
        },
    }

    t.true(isIterable('foo'))
    t.true(isIterable(a))
    t.true(isIterable(gen()))
    t.true(isIterable(custom))

    const o = {}

    t.false(isIterable(o))
    t.false(isIterable(12))
    t.false(isIterable(x => x**2))
})

test("isIterable returns false for non-function [Symbol.iterator] properties", t => {
    const custom = {
        [Symbol.iterator]: 12,
    }

    t.false(isIterable(custom))
})

test('isIterable throws early on invalid arguments', t => {
    t.throws(_ => isIterable([], 12))
    t.throws(_ => isIterable(12, []))
})
