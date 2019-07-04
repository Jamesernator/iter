import test from "ava"
import flat from "../../async/flat.mjs"
import toArray from "../../async/toArray.mjs"

test('flat basic functionality', async t => {
    const data = [[1], [2, 3], [4, 5], [6], [7], [8, 9, 10]]

    t.deepEqual(
        await toArray(flat(data)),
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    )

    const data2 = [[[1]], [2, 3], [4, [5]], [[[6]]]]
    t.deepEqual(
        await toArray(flat(data2)),
        [[1], 2, 3, 4, [5], [[6]]],
    )
})

test('flat throws on non-iterables in sequences', async t => {
    await t.throwsAsync(toArray(flat([1])))
    await t.throwsAsync(toArray(flat([[1, 2], 3, [4, 5]])))
})

test('flat throws early on bad arguments', t => {
    t.throws(_ => flat())
    t.throws(_ => flat([], 'banana'))
    t.throws(_ => flat([], 2, 'fishBiscuit'))
    t.throws(_ => flat([], 2))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const inner = countClosing([1, 2])
    const data = countClosing([[1], inner])
    const seq = flat(data)[Symbol.asyncIterator]()

    await seq.next()
    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
    t.is(inner.closed, 1)
})
