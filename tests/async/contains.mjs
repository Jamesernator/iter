import test from "ava"
import contains from "../../async/contains.mjs"

test("contains default Object.is", async t => {
    t.true(
        await contains([1, 2, 3, 4], 2),
    )
    const x = {}
    t.true(
        await contains([x, {}, NaN], x),
    )

    t.true(
        await contains([0, 4], 0),
    )

    t.false(
        await contains([-0, 4], 0),
    )
    t.true(
        await contains([3, NaN, 'banana'], NaN),
    )

    t.false(
        await contains([{}, 'foo', NaN], x),
    )
})

test("contains custom equality", async t => {
    const data = [[1, 2], [3, 4]]
    const equals = ([x1, y1], [x2, y2]) => {
        return Object.is(x1, x2) && Object.is(y1, y2)
    }
    t.true(
        await contains(data, [1, 2], equals),
    )

    t.false(
        await contains(data, [4, 5], equals),
    )

    const data2 = [null, '3', [1, 2]]
    await t.throwsAsync(contains(data2, [1, 2], equals))
})

test("contains custom equality doesn't throw if value found before throwing case", async t => {
    const data = [[5, 6], [1, 2], null]
    const equals = ([x1, y1], [x2, y2]) => {
        return Object.is(x1, x2) && Object.is(y1, y2)
    }

    t.true(
        await contains(data, [1, 2], equals),
    )
})

test("contains throws early on bad arguments", t => {
    t.throws(_ => contains())
    t.throws(_ => contains([], 0, 'fishBiscuit'))
    t.throws(_ => contains([], 0, null))
    t.throws(_ => contains([], 0, {}, 'bar'))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const d1 = countClosing([1, 2, 3, 4])

    await contains(d1, 12)
    t.is(d1.closed, 0)

    await contains(d1, 2)
    t.is(d1.closed, 1)
})
