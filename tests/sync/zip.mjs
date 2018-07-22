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

import countClosing from "./helpers/countClosing.mjs"

test("zip iterator closing all sequences", t => {
    const data1 = countClosing([1, 2])
    const data2 = countClosing([3, 4])

    const seq = zip(data1, data2)[Symbol.iterator]()
    seq.next()
    seq.return()
    t.is(data1.closed, 1)
    t.is(data2.closed, 1)
})

test("zip iterator closing only as needed on completion", t => {
    const data1 = countClosing([1, 2])
    const data2 = countClosing([1, 2, 3])

    const seq = zip(data1, data2)[Symbol.iterator]()
    seq.next()
    seq.next()
    seq.next()
    seq.return()
    t.is(data1.closed, 0)
    t.is(data2.closed, 1)
})
