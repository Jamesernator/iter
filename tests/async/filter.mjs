import test from "ava"
import filter from "../../async/filter.mjs"
import toArray from "../../async/toArray.mjs"

test('filter basic functionality', async t => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    t.deepEqual(
        await toArray(filter(data, x => x % 3 === 0)),
        [3, 6, 9],
    )
})

test('filter receives correct arguments', async t => {
    const data = [4, 3, 2, 1]

    t.deepEqual(
        await toArray(filter(data, (_, idx) => idx % 2 === 0)),
        [4, 2],
    )

    await toArray(filter(data, (_, __, ...rest) => t.deepEqual(rest, [])))
})

test('filter throws early on bad input', t => {
    t.throws(_ => filter())
    t.throws(_ => filter([], 2))
    t.throws(_ => filter([], _ => true, 'banana'))
})

import countClosing from "./helpers/countClosing.mjs"

test("filter iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = filter(data, x => x % 2 === 0)[Symbol.asyncIterator]()

    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
})

test("filter iterator closing on iteratee error", async t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = filter(data, _ => { throw new Error("Error") })[Symbol.asyncIterator]()

    await t.throwsAsync(seq.next())
    t.is(data.closed, 1)
})
