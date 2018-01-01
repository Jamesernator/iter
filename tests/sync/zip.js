import test from "ava"
import zip from "../../sync/zip.mjs"
import toArray from "../../sync/toArray.mjs"

test("zip basic functionality", t => {
    const d1 = [1, 2, 3, 4, 5]
    const d2 = [6, 7, 8, 9, 10]

    t.deepEqual(toArray(zip(d1, d2)), [
        [1, 6],
        [2, 7],
        [3, 8],
        [4, 9],
        [5, 10],
    ])
})

test("zip only takes until shortest sequence is complete", t => {
    const d1 = [1, 2]
    const d2 = [1, 2, 3, 4]
    t.deepEqual(toArray(zip(d1, d2)), [
        [1, 1],
        [2, 2],
    ])
})

test("zip can accept more than two iterables", t => {
    const d1 = [1, 2, 3]
    const d2 = [4, 5, 6]
    const d3 = [7, 8, 9]

    t.deepEqual(toArray(zip(d1, d2, d3)), [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
    ])
})

test("zip throws early on invalid arguments", t => {
    t.throws(_ => zip())
    t.throws(_ => zip(1, 2))
    t.throws(_ => zip([1, 2, 3, 4], 12))
})
