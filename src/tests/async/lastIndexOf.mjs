import test from "ava"
import lastIndexOf from "../../async/lastIndexOf.mjs"

test('lastIndexOf returns the correct index for a given value', async t => {
    const data = [1, 2, 3, 4, 5, 42, 11]

    t.is(2, await lastIndexOf(data, 3))
    t.is(5, await lastIndexOf(data, 42))
})

test('lastIndexOf returns the last index for a given value', async t => {
    const data = ['banana', 1, 2, 4, 'banana', 1]

    t.is(4, await lastIndexOf(data, 'banana'))
    t.is(5, await lastIndexOf(data, 1))
})

test("lastIndexOf returns null if the item can't be found", async t => {
    const data = [1, 2, 3, 4]

    t.is(null, await lastIndexOf(data, 42))
    t.is(null, await lastIndexOf(data, 'banana'))
})

test("lastIndexOf uses Object.is to compare", async t => {
    const data = [0, -0, NaN]

    t.is(1, await lastIndexOf(data, -0))
    t.is(0, await lastIndexOf(data, 0))
    t.is(2, await lastIndexOf(data, NaN))
})

test("lastIndexOf with custom equality", async t => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8], [1, 2]]
    const equal = ([x1, y1], [x2, y2]) => Object.is(x1, x2) && Object.is(y1, y2)

    t.is(4, await lastIndexOf(data, [1, 2], equal))
    t.is(1, await lastIndexOf(data, [3, 4], equal))
    await t.throwsAsync(lastIndexOf([1], [3, 4], equal))
    t.is(null, await lastIndexOf(data, [11, 12], equal))
})

test("lastIndexOf throws early on invalid arguments", t => {
    t.throws(_ => lastIndexOf())
    t.throws(_ => lastIndexOf([], 2, []))
    t.throws(_ => lastIndexOf([], 3, _ => [], 'banana'))
})
