import test from "ava"
import lastIndexOf from "../../sync/lastIndexOf.mjs"

test('lastIndexOf returns the correct index for a given value', t => {
    const data = [1, 2, 3, 4, 5, 42, 11]

    t.is(2, lastIndexOf(data, 3))
    t.is(5, lastIndexOf(data, 42))
})

test('lastIndexOf returns the last index for a given value', t => {
    const data = ['banana', 1, 2, 4, 'banana', 1]

    t.is(4, lastIndexOf(data, 'banana'))
    t.is(5, lastIndexOf(data, 1))
})

test("lastIndexOf returns null if the item can't be found", t => {
    const data = [1, 2, 3, 4]

    t.is(null, lastIndexOf(data, 42))
    t.is(null, lastIndexOf(data, 'banana'))
})

test("lastIndexOf uses Object.is to compare", t => {
    const data = [0, -0, NaN]

    t.is(1, lastIndexOf(data, -0))
    t.is(0, lastIndexOf(data, 0))
    t.is(2, lastIndexOf(data, NaN))
})

test("lastIndexOf with custom equality", t => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8], [1, 2]]
    const equal = ([x1, y1], [x2, y2]) => Object.is(x1, x2) && Object.is(y1, y2)

    t.is(4, lastIndexOf(data, [1, 2], equal))
    t.is(1, lastIndexOf(data, [3, 4], equal))
    t.throws(_ => lastIndexOf([1], [3, 4], equal))
    t.is(null, lastIndexOf(data, [11, 12], equal))
})

test("lastIndexOf throws early on invalid arguments", t => {
    t.throws(_ => lastIndexOf())
    t.throws(_ => lastIndexOf([], 2, []))
    t.throws(_ => lastIndexOf([], 3, _ => [], 'banana'))
})
