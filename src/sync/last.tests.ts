import test from "ava"
import last from "../../sync/last.js"

test('last with no arguments returns the last element of the sequence', t => {
    t.is(
        last([1, 2, 3, 4]),
        4,
    )

    t.is(
        last(['banana', 342]),
        342,
    )
})

test('last with no arguments throws an error on an empty sequence', t => {
    t.throws(_ => last([]))
})


test('last with numeric argument returns a sequence of that length', t => {
    t.deepEqual(
        last([1, 2, 3, 4, 5, 6, 7], 3),
        [5, 6, 7],
    )

    t.deepEqual(
        last([1, 2, 3, 4], 0),
        [],
    )
})

test('last with count that is too short throws an error', t => {
    t.throws(_ => last([1, 2], 3))
    t.throws(_ => last([], 1))
    t.notThrows(_ => last([], 0))
})

test('last with count that is too short can be supressed by passing true', t => {
    t.deepEqual(
        last([1, 2], 3, true),
        [1, 2],
    )
})

test('last throws early with invalid arguments', t => {
    t.throws(_ => last())
    t.throws(_ => last([1, 2, 3], 'banana'))
    t.throws(_ => last([], 2, true, 12))
    t.throws(_ => last([], 'single', true))
})
