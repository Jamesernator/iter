import test from "ava"
import first from "../../src/sync/first.mjs"

test('first with no arguments returns the first element of the sequence', t => {
    t.is(
        first([1, 2, 3, 4]),
        1,
    )

    t.is(
        first(['banana', 342]),
        'banana',
    )
})

test('first with no arguments throws an error on an empty sequence', t => {
    t.throws(_ => first([]))
})


test('first with numeric argument returns a sequence of that length', t => {
    t.deepEqual(
        first([1, 2, 3, 4, 5, 6, 7], 3),
        [1, 2, 3],
    )

    t.deepEqual(
        first([1, 2, 3, 4], 0),
        [],
    )
})

test('first with count that is too short throws an error', t => {
    t.throws(_ => first([1, 2], 3))
    t.throws(_ => first([], 1))
    t.notThrows(_ => first([], 0))
})

test('first with count that is too short can be supressed by passing true', t => {
    t.deepEqual(
        first([1, 2], 3, true),
        [1, 2],
    )
})

test('first throws early with invalid arguments', t => {
    t.throws(_ => first([1, 2, 3], 'banana'))
    t.throws(_ => first([], 2, true, 12))
    t.throws(_ => first([], 'single', true))
})
