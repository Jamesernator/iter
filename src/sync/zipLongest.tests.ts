import test from "ava"
import zipLongest from "../../sync/zipLongest.js"
import toArray from "../../sync/toArray.js"

test("zipLongest basic functionality", t => {
    const d1 = [1, 2, 3, 4, 5]
    const d2 = [6, 7, 8, 9, 10]

    t.deepEqual(toArray(zipLongest([d1, d2])), [
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
    t.deepEqual(toArray(zipLongest([d1, d2])), [
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

    t.deepEqual(toArray(zipLongest([d1, d2, d3])), [
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

import CountClosing from "./helpers/CountClosing.js"

test("zipLongest iterator closing all if early", t => {
    const data1 = CountClosing([1, 2])
    const data2 = CountClosing([3, 4])

    const seq = zipLongest([data1, data2])[Symbol.iterator]()
    seq.next()
    seq.return()
    t.is(data1.closed, 1)
    t.is(data2.closed, 1)
})
