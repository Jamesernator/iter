import test from "ava"
import flatten from "../../async/flatten.mjs"
import toArray from "../../async/toArray.mjs"

test('flatten basic functionality', async t => {
    const data = [[1], [2, 3], [4, 5], [6], [7], [8, 9, 10]]

    t.deepEqual(
        await toArray(flatten(data)),
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    )

    const data2 = [[[1]], [2, 3], [4, [5]], [[[6]]]]
    t.deepEqual(
        await toArray(flatten(data2)),
        [[1], 2, 3, 4, [5], [[6]]],
    )
})

test('flatten throws on non-iterables in sequences', async t => {
    await t.throws(toArray(flatten([1])))
    await t.throws(toArray(flatten([[1, 2], 3, [4, 5]])))
})

test('flatten throws early on bad arguments', t => {
    t.throws(_ => flatten())
    t.throws(_ => flatten([], 'banana'))
    t.throws(_ => flatten([], 2, 'fishBiscuit'))
    t.throws(_ => flatten([], 2))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const inner = countClosing([1, 2])
    const data = countClosing([[1], inner])
    const seq = flatten(data)[Symbol.asyncIterator]()

    await seq.next()
    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
    t.is(inner.closed, 1)
})
