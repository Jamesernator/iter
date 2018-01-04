import test from "ava"
import findLastIndex from "../../async/findLastIndex.mjs"

test('findLastIndex basic functionality', async t => {
    const data = [1, 2, 3, 4, 5, 1]

    t.is(
        await findLastIndex(data, x => x === 2),
        1,
    )

    t.is(
        await findLastIndex(data, x => x === 1),
        5,
    )
})

test('findLastIndex throws when no value is found matching predicate', async t => {
    const data = [1, 2, 3, 4]
    await t.throws(findLastIndex(data, x => x === 42))
})

test('findLastIndex defaults to index of last truthy value', async t => {
    const data = [1, 0, undefined, false, null, '', NaN, 1, false]
    t.is(
        await findLastIndex(data),
        7,
    )
})

test('findLastIndex with default returns default is not found', async t => {
    const data = [1, 2, 3, 4, 3, 12]

    t.is(
        await findLastIndex(data, null, x => x === 42),
        null,
    )

    t.is(
        await findLastIndex(data, 'banana', x => x === 42),
        'banana',
    )

    t.is(
        await findLastIndex(data, null, x => x === 3),
        4,
    )
})

test('findLastIndex throws early on bad arguments', t => {
    const data = []
    t.throws(_ => findLastIndex())
    t.throws(_ => findLastIndex(data, x => x === 42, 2))
    t.throws(_ => findLastIndex(data, 2, x => x === 42, 'banana'))
    t.throws(_ => findLastIndex(data, 4))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])

    await findLastIndex(data, 99, x => x > 5)
    t.is(data.closed, 0)

    await findLastIndex(data, 99, x => x === 2)
    t.is(data.closed, 0)
})
