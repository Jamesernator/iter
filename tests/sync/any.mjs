import test from "ava"
import any from "../../sync/any.mjs"

test('any without argument returns true if a value is truthy', t => {
    const target1 = [true, 'cats', {}, 1]
    const target2 = [false, 0, '', undefined, null]
    const target3 = [false, 0, {}, '', undefined, null]

    t.true(
        any(target1),
    )

    t.false(
        any(target2),
    )

    t.true(
        any(target3),
    )
})

test('any', t => {
    const target = [1, 3, 5, 7]

    t.true(
        any(target, item => item % 2 === 1),
    )

    t.true(
        any(target, item => item < 5),
    )

    t.false(
        any(target, item => item > 10),
    )
})

test('any vacuously false', t => {
    const target = []

    t.false(
        any(target),
    )

    t.false(
        any(target, x => x === 2e21),
    )
})

test('any throws early with bad arguments', t => {
    t.throws(_ => any())
    t.throws(_ => any([], 2))
    t.throws(_ => any([], x => x, 'banana'))
})

import countClosing from "./helpers/countClosing.mjs"

test("any iterator closing", t => {
    const iter = countClosing([1, 2, 3, 4])

    t.true(any(iter, x => x > 0))
    t.is(iter.closed, 1)

    t.false(any(iter, x => x === 12))
    t.is(iter.closed, 1)
})
