import test from "ava"
import concat from "../../sync/concat.mjs"
import toArray from "../../sync/toArray.mjs"

test("concat works with single concatentation", t => {
    t.deepEqual(
        toArray(concat([1, 2, 3, 4], [5, 6, 7, 8])),
        [1, 2, 3, 4, 5, 6, 7, 8],
    )

    t.deepEqual(
        toArray(concat([1, 2, 3, 4], [])),
        [1, 2, 3, 4],
    )

    t.deepEqual(
        toArray(concat([], [1, 2, 3, 4])),
        [1, 2, 3, 4],
    )

    t.deepEqual(
        toArray(concat([], [])),
        [],
    )
})

test("concat works with multiple concatentations", t => {
    t.deepEqual(
        toArray(concat([1, 2, 3], [4, 5, 6], [7, 8, 9])),
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
    )
})

test("concat can reuse the same iterable multiple times", t => {
    const x = [1, 2]
    t.deepEqual(
        toArray(concat(x, x, x, x)),
        [1, 2, 1, 2, 1, 2, 1, 2],
    )
})

test("concat can't take zero arguments'", t => {
    t.throws(_ => {
        toArray(concat())
    })
})

test("concat throws early on invalid arguments", t => {
    t.throws(_ => concat([1, 2, 3, 4], 12))
    t.throws(_ => concat())
    t.throws(_ => concat(12))
})

import countClosing from "./helpers/countClosing.mjs"
import consumeIterator from "./helpers/consumeIterator.mjs"

test("iterator closing", t => {
    const d1 = countClosing([1, 2])
    const d2 = countClosing([1, 2, 3])
    const d3 = countClosing([1, 2])

    const seq = concat(d1, d2, d3)[Symbol.iterator]()
    consumeIterator(seq, 4)
    seq.return()
    t.is(d1.closed, 0)
    t.is(d2.closed, 1)
    t.is(d3.closed, 0)
})
