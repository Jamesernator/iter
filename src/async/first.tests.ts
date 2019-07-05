import test from "ava"
import first from "../../async/first.js"

test('first with no arguments returns the first element of the sequence', async t => {
    t.is(
        await first([1, 2, 3, 4]),
        1,
    )

    t.is(
        await first(['banana', 342]),
        'banana',
    )
})

test('first with no arguments throws an error on an empty sequence', async t => {
    await t.throwsAsync(first([]))
})


test('first with numeric argument returns a sequence of that length', async t => {
    t.deepEqual(
        await first([1, 2, 3, 4, 5, 6, 7], 3),
        [1, 2, 3],
    )

    t.deepEqual(
        await first([1, 2, 3, 4], 0),
        [],
    )
})

test('first with count that is too short throws an error', async t => {
    await t.throwsAsync(first([1, 2], 3))
    await t.throwsAsync(first([], 1))
    await t.notThrowsAsync(first([], 0))
})

test('first with count that is too short can be supressed by passing true', async t => {
    t.deepEqual(
        await first([1, 2], 3, true),
        [1, 2],
    )
})

test('first throws early with invalid arguments', t => {
    t.throws(_ => first())
    t.throws(_ => first([1, 2, 3], 'banana'))
    t.throws(_ => first([], 2, true, 12))
    t.throws(_ => first([], 'single', true))
})

import CountClosing from "./helpers/CountClosing.js"

test("iterator closing", async t => {
    const data = CountClosing([1, 2, 3, 4])

    await first(data)
    t.is(data.closed, 1)

    await first(data, 3)
    t.is(data.closed, 2)

    await first(data, 5, true)
    t.is(data.closed, 2)
})
