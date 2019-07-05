import test from "ava"
import contains from "../../sync/contains.js"

test("contains default Object.is", t => {
    t.true(
        contains([1, 2, 3, 4], 2),
    )
    const x = {}
    t.true(
        contains([x, {}, NaN], x),
    )

    t.true(
        contains([0, 4], 0),
    )

    t.false(
        contains([-0, 4], 0),
    )
    t.true(
        contains([3, NaN, 'banana'], NaN),
    )

    t.false(
        contains([{}, 'foo', NaN], x),
    )
})

test("contains custom equality", t => {
    const data = [[1, 2], [3, 4]]
    const equals = ([x1, y1], [x2, y2]) => {
        return Object.is(x1, x2) && Object.is(y1, y2)
    }
    t.true(
        contains(data, [1, 2], equals),
    )

    t.false(
        contains(data, [4, 5], equals),
    )

    t.throws(_ => {
        const data = [null, '3', [1, 2]]
        contains(data, [1, 2], equals)
    })
})

test("contains custom equality doesn't throw if value found before throwing case", t => {
    const data = [[5, 6], [1, 2], null]
    const equals = ([x1, y1], [x2, y2]) => {
        return Object.is(x1, x2) && Object.is(y1, y2)
    }

    t.true(
        contains(data, [1, 2], equals),
    )
})

test("contains throws early on bad arguments", t => {
    t.throws(_ => contains())
    t.throws(_ => contains([], 0, 'fishBiscuit'))
    t.throws(_ => contains([], 0, null))
    t.throws(_ => contains([], 0, {}, 'bar'))
})

import CountClosing from "./helpers/CountClosing.js"

test("iterator closing", t => {
    const d1 = CountClosing([1, 2, 3, 4])

    contains(d1, 12)
    t.is(d1.closed, 0)

    contains(d1, 2)
    t.is(d1.closed, 1)
})
