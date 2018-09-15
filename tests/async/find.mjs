import test from "ava"
import find from "../../async/find.mjs"

test('find basic functionality', async t => {
    const val = { x: 10, y: 20 }
    const data = [1, { x: 20, y: 'banana' }, 2, 'banana', val, NaN, '']

    t.is(
        await find(data, item => item instanceof Object && item.x === 10),
        val,
    )

    t.is(
        await find(data, item => item === 2),
        2,
    )
})

test('find with no argument returns first truthy value', async t => {
    const data = [0, '', null, undefined, NaN, false, 1]
    t.is(
        await find(data),
        1,
    )
})

test("find throws when it can't find the given element", async t => {
    const data = [1, 2, 3, 4]
    await t.throwsAsync(find(data, x => x === 42))
    await t.throwsAsync(find([], x => x === 42))
})

test("find returns the default value when it can't find the given element", async t => {
    const data = [1, 2, 3, 4]
    t.is(
        await find(data, 0, x => x === 42),
        0,
    )

    const empty = []
    t.is(
        await find(empty, 0, x => x === 42),
        0,
    )
})

test('find throws early on bad arguments', t => {
    const data = []
    t.throws(_ => find())
    t.throws(_ => find(data, _ => 2, x => x, 3))
    t.throws(_ => find(data, 2))
    t.throws(_ => find(data, _ => 2, 12))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])

    await find(data, 99, x => x > 5)
    t.is(data.closed, 0)

    await find(data, 99, x => x === 2)
    t.is(data.closed, 1)
})
