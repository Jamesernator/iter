import test from "ava"
import findIndex from "../../async/findIndex.mjs"

test('findIndex finds item if it exists', async t => {
    const data = [1, 2, 3, 4]

    t.is(
        await findIndex(data, x => x === 3),
        2,
    )
})

test("findIndex throws error if no item is found", async t => {
    const data = [1, 2, 3, 4]

    await t.throwsAsync(findIndex(data, x => x === 42))
})

test('findIndex with no argument returns the index of the first truthy', async t => {
    const data = [0, undefined, null, '', NaN, false, 1]

    t.is(
        await findIndex(data),
        6,
    )
})

test('findIndex returns default value if not found', async t => {
    const data = [1, 2, 3, 4, 1, 2, 1, 2, 1]

    t.is(
        await findIndex(data, null, x => x === 42),
        null,
    )

    t.is(
        await findIndex(data, null, x => x === 4),
        3,
    )
})

test('findIndex throws early on bad arguments', t => {
    const data = []
    t.throws(_ => findIndex())
    t.throws(_ => findIndex(data, x => x === 42, 2))
    t.throws(_ => findIndex(data, x => x === 42, 'banana'))
    t.throws(_ => findIndex(data, 4))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])

    await findIndex(data, 99, x => x > 5)
    t.is(data.closed, 0)

    await findIndex(data, 99, x => x === 2)
    t.is(data.closed, 1)
})
