import test from "ava"
import flatten from "../../sync/flatten.mjs"
import toArray from "../../sync/toArray.mjs"

test('flatten basic functionality', t => {
    const data = [[1], [2, 3], [4, 5], [6], [7], [8, 9, 10]]

    t.deepEqual(
        toArray(flatten(data)),
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    )

    const data2 = [[[1]], [2, 3], [4, [5]], [[[6]]]]
    t.deepEqual(
        toArray(flatten(data2)),
        [[1], 2, 3, 4, [5], [[6]]],
    )
})

test('flatten throws on non-iterables in sequences', t => {
    t.throws(_ => toArray(flatten([1])))
    t.throws(_ => toArray(flatten([[1, 2], 3, [4, 5]])))
})

test('flatten throws early on bad arguments', t => {
    t.throws(_ => flatten())
    t.throws(_ => flatten([], 'banana'))
    t.throws(_ => flatten([], 2, 'fishBiscuit'))
    t.throws(_ => flatten([], 2))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", t => {
    const inner = countClosing([1, 2])
    const data = countClosing([[1], inner])
    const seq = flatten(data)[Symbol.iterator]()

    seq.next()
    seq.next()
    seq.return()
    t.is(data.closed, 1)
    t.is(inner.closed, 1)
})
