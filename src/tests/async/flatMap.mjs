import test from "ava"
import flatMap from "../../async/flatMap.mjs"
import toArray from "../../async/toArray.mjs"

test('flatMap basic functionality', async t => {
    const data = [1, 2, 3, 4]

    t.deepEqual(
        await toArray(flatMap(data, x => [x, x])),
        [1, 1, 2, 2, 3, 3, 4, 4],
    )
    t.deepEqual(
        await toArray(flatMap(data, x => [[x, x]])),
        [[1, 1], [2, 2], [3, 3], [4, 4]],
    )
})

test("flatMap doesn't flatten non-iterables", async t => {
    const data = [1, 2, 3, 4]

    await t.throwsAsync(toArray(flatMap(data, x => x)))

    await t.throwsAsync(toArray(flatMap(data, x => x % 2 === 0 ? [] : x)))
})

test("flatMap can ignore non-iterables if requested", async t => {
    const data = [1, 2, 3, 4]

    t.deepEqual(
        await toArray(flatMap(data, true, x => x)),
        [1, 2, 3, 4],
    )

    t.deepEqual(
        await toArray(flatMap(data, true, x => x % 2 === 0 ? [] : x)),
        [1, 3],
    )
})

test('flatMap throws early on bad arguments', t => {
    t.throws(_ => flatMap())
    t.throws(_ => flatMap([], 'banana'))
    t.throws(_ => flatMap([], 2, 'fishBiscuit'))
    t.throws(_ => flatMap([], x => x**2, -3))
    t.throws(_ => flatMap([], x => x**2, 3, 4, 5))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])
    const inner = countClosing([1, 2])
    const seq = flatMap(data, _ => inner)[Symbol.asyncIterator]()
    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
    t.is(inner.closed, 1)
})
