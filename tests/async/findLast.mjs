import test from "ava"
import findLast from "../../async/findLast.mjs"

test('findLast basic functionality', async t => {
    const val = { x: 20, y: 20 }
    const data = [1, { x: 20, y: 'banana' }, 2, 'banana', val, NaN, '']

    t.is(
        await findLast(data, item => item instanceof Object && item.x === 20),
        val,
    )

    t.is(
        await findLast(data, item => item === 2),
        2,
    )
})

test('findLast with no argument returns first truthy value', async t => {
    const data = [10, 0, '', null, undefined, NaN, false, 1]
    t.is(
        await findLast(data),
        1,
    )
})

test("findLast throws when it can't find any such element", async t => {
    const data = [1, 2, 3, 4]
    await t.throws(findLast(data, x => x === 42))

    const empty = []
    await t.throws(findLast(empty, x => x === 42))
})

test("findLast returns the default when provided and it can't find any such element", async t => {
    const data = [1, 2, 3, 4]
    t.is(
        await findLast(data, 0, x => x === 42),
        0,
    )

    const empty = []
    t.is(
        await findLast(empty, 0, x => x === 42),
        0,
    )

    t.is(
        await findLast(data, 'banana', x => x === 42),
        'banana',
    )
})

test('findLast throws early on bad arguments', t => {
    const data = []
    t.throws(_ => findLast())
    t.throws(_ => findLast(data, _ => 2, x => x, 3))
    t.throws(_ => findLast(data, 2))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])

    await findLast(data, 99, x => x > 5)
    t.is(data.closed, 0)

    await findLast(data, 99, x => x === 2)
    t.is(data.closed, 0)
})
