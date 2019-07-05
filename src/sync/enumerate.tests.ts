import test from "ava"
import enumerate from "../../sync/enumerate.js"
import toArray from "../../sync/toArray.js"

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

import CountClosing from "./helpers/CountClosing.js"
import consumeIterator from "./helpers/consumeIterator.js"

test("iterator closing", t => {
    const data = CountClosing([1, 2, 3, 4])
    const seq = enumerate(data)[Symbol.iterator]()

    consumeIterator(seq, 2)
    seq.return()
    t.is(data.closed, 1)
})
