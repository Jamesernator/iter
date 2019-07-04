import test from "ava"
import enumerate from "../../async/enumerate.mjs"
import toArray from "../../async/toArray.mjs"

test('enumerate gives pairs of values', async t => {
    t.deepEqual(
        await toArray(enumerate([5, 2, 1, 'banana'])),
        [[0, 5], [1, 2], [2, 1], [3, 'banana']],
    )
})

test('enumerate throws early on invalid arguments', t => {
    t.throws(_ => enumerate([], 0))
    t.throws(_ => enumerate())
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = enumerate(data)[Symbol.asyncIterator]()

    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
})
