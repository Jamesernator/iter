import test from "ava"
import enumerate from "../../sync/enumerate.mjs"
import toArray from "../../sync/toArray.mjs"

test('enumerate gives pairs of values', t => {
    t.deepEqual(
        toArray(enumerate([5, 2, 1, 'banana'])),
        [[0, 5], [1, 2], [2, 1], [3, 'banana']],
    )
})

test('enumerate throws early on invalid arguments', t => {
    t.throws(_ => enumerate([], 0))
    t.throws(_ => enumerate())
})

import countClosing from "./helpers/countClosing.mjs"
import consumeIterator from "./helpers/consumeIterator.mjs"

test("iterator closing", t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = enumerate(data)[Symbol.iterator]()

    consumeIterator(seq, 2)
    seq.return()
    t.is(data.closed, 1)
})
