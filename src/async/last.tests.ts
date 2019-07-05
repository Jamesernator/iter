import test from "ava"
import last from "../../async/last.js"

test('last with no arguments returns the last element of the sequence', async t => {
    t.is(
        await last([1, 2, 3, 4]),
        4,
    )

    t.is(
        await last(['banana', 342]),
        342,
    )
})

test('last with no arguments throws an error on an empty sequence', async t => {
    await t.throwsAsync(last([]))
})


test('last with numeric argument returns a sequence of that length', async t => {
    t.deepEqual(
        await last([1, 2, 3, 4, 5, 6, 7], 3),
        [5, 6, 7],
    )

    t.deepEqual(
        await last([1, 2, 3, 4], 0),
        [],
    )
})

test('last with count that is too short throws an error', async t => {
    await t.throwsAsync(last([1, 2], 3))
    await t.throwsAsync(last([], 1))
    await t.notThrowsAsync(last([], 0))
})

test('last with count that is too short can be supressed by passing true', async t => {
    t.deepEqual(
        await last([1, 2], 3, true),
        [1, 2],
    )
})

test('last throws early with invalid arguments', t => {
    t.throws(_ => last())
    t.throws(_ => last([1, 2, 3], 'banana'))
    t.throws(_ => last([], 2, true, 12))
    t.throws(_ => last([], 'single', true))
})
