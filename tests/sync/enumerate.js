import test from "ava"
import enumerate from "../../src/sync/enumerate.mjs"
import toArray from "../../src/sync/toArray.mjs"

test('enumerate gives pairs of values', t => {
    t.deepEqual(
        toArray(enumerate([5, 2, 1, 'banana'])),
        [[0, 5], [1, 2], [2, 1], [3, 'banana']],
    )
})

test('enumerate throws early on invalid arguments', t => {
    t.throws(_ => {
        enumerate([], 0)
    })
})
