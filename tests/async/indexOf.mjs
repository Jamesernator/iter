import test from "ava"
import indexOf from "../../async/indexOf.mjs"

test('indexOf returns the correct index for a given value', async t => {
    const data = [1, 2, 3, 4, 5, 42, 11]

    t.is(2, await indexOf(data, 3))
    t.is(5, await indexOf(data, 42))
})

test('indexOf returns the first index for a given value', async t => {
    const data = ['banana', 1, 2, 4, 'banana', 1]

    t.is(0, await indexOf(data, 'banana'))
    t.is(1, await indexOf(data, 1))
})

test("indexOf returns null if the item can't be found", async t => {
    const data = [1, 2, 3, 4]

    t.is(null, await indexOf(data, 42))
    t.is(null, await indexOf(data, 'banana'))
})

test("indexOf uses Object.is to compare", async t => {
    const data = [0, -0, NaN]

    t.is(1, await indexOf(data, -0))
    t.is(0, await indexOf(data, 0))
    t.is(2, await indexOf(data, NaN))
})

test("indexOf with custom equality", async t => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8]]
    const equal = ([x1, y1], [x2, y2]) => Object.is(x1, x2) && Object.is(y1, y2)

    t.is(1, await indexOf(data, [3, 4], equal))
    await t.throws(indexOf([1], [3, 4], equal))
    t.is(null, await indexOf(data, [11, 12], equal))
})

test("indexOf throws early on invalid arguments", t => {
    t.throws(_ => indexOf())
    t.throws(_ => indexOf([], 2, []))
    t.throws(_ => indexOf([], 3, _ => [], 'banana'))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])
    await indexOf(data, 12)
    t.is(data.closed, 0)
    await indexOf(data, 2)
    t.is(data.closed, 1)

    await t.throws(indexOf(data, 'foo', _ => { throw new Error("Error") }))
    t.is(data.closed, 2)
})
