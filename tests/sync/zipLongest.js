import test from "ava"
import zipLongest from "../../sync/zipLongest.mjs"
import toArray from "../../sync/toArray.mjs"

test("zipLongest basic functionality", t => {
    const d1 = [1, 2, 3, 4, 5]
    const d2 = [6, 7, 8, 9, 10]

    t.deepEqual(toArray(zipLongest(d1, d2)), [
        [1, 6],
        [2, 7],
        [3, 8],
        [4, 9],
        [5, 10],
    ])
})

test("zipLongest only takes until longest sequence is complete filling with undefined", t => {
    const d1 = [1, 2]
    const d2 = [1, 2, 3, 4]
    t.deepEqual(toArray(zipLongest(d1, d2)), [
        [1, 1],
        [2, 2],
        [undefined, 3],
        [undefined, 4],
    ])
})

test("zipLongest can accept more than two iterables", t => {
    const d1 = [1, 2, 3]
    const d2 = [4, 5, 6]
    const d3 = [7, 8, 9]

    t.deepEqual(toArray(zipLongest(d1, d2, d3)), [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
    ])
})

test("zipLongest throws early on invalid arguments", t => {
    t.throws(_ => zipLongest())
    t.throws(_ => zipLongest(1, 2))
    t.throws(_ => zipLongest([1, 2, 3, 4], 12))
})
