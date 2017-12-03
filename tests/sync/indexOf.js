import test from "ava"
import indexOf from "../../sync/indexOf.mjs"

test('indexOf returns the correct index for a given value', t => {
    const data = [1, 2, 3, 4, 5, 42, 11]

    t.is(2, indexOf(data, 3))
    t.is(5, indexOf(data, 42))
})

test('indexOf returns the first index for a given value', t => {
    const data = ['banana', 1, 2, 4, 'banana', 1]

    t.is(0, indexOf(data, 'banana'))
    t.is(1, indexOf(data, 1))
})

test("indexOf returns null if the item can't be found", t => {
    const data = [1, 2, 3, 4]

    t.is(null, indexOf(data, 42))
    t.is(null, indexOf(data, 'banana'))
})

test("indexOf uses Object.is to compare", t => {
    const data = [0, -0, NaN]

    t.is(1, indexOf(data, -0))
    t.is(0, indexOf(data, 0))
    t.is(2, indexOf(data, NaN))
})

test("indexOf with custom equality", t => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8]]
    const equal = ([x1, y1], [x2, y2]) => Object.is(x1, x2) && Object.is(y1, y2)

    t.is(1, indexOf(data, [3, 4], equal))
    t.throws(_ => indexOf([1], [3, 4], equal))
    t.is(null, indexOf(data, [11, 12], equal))
})

test("indexOf throws early on invalid arguments", t => {
    t.throws(_ => indexOf([], 2, []))
    t.throws(_ => indexOf([], 3, _ => [], 'banana'))
})
