import test from "ava"
import reject from "../../async/reject.mjs"
import toArray from "../../async/toArray.mjs"

test('reject basic functionality', async t => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    t.deepEqual(
        await toArray(reject(data, x => x % 3 === 0)),
        [1, 2, 4, 5, 7, 8, 10],
    )
})

test('reject receives correct arguments', async t => {
    const data = [4, 3, 2, 1]

    t.deepEqual(
        await toArray(reject(data, (_, idx) => idx % 2 === 0)),
        [3, 1],
    )

    await toArray(reject(data, (_, __, ...rest) => t.deepEqual(rest, [])))
})

test('reject throws early on bad input', t => {
    t.throws(_ => reject())
    t.throws(_ => reject([], 2))
    t.throws(_ => reject([], _ => true, 'banana'))
})

import countClosing from "./helpers/countClosing.mjs"

test("reject iterator closing on early close", async t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = reject(data, x => x % 2 === 0)[Symbol.asyncIterator]()

    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
})

test("reject iterator closing on predicate error", async t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = reject(data, _ => { throw "Error" })[Symbol.asyncIterator]()

    await t.throws(seq.next())
    t.is(data.closed, 1)
})
