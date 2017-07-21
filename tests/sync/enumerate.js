import test from "ava"
import enumerate from "../../src/sync/enumerate.js"
import array from "../../src/sync/array.js"
import final from "../../src/sync/final.js"
import withFinal from "../../src/sync/withFinal.js"

test('enumerate', t => {
    t.deepEqual(
        [5, 2, 1, 'banana']::enumerate()::array(),
        [[5, 0], [2, 1], [1, 2], ['banana', 3]]
    )
})

test('enumerate final value preserved', t => {
    t.is(
        [4,3,2,1]::withFinal('banana')::enumerate()::final(),
        'banana'
    )
})

test('enumerate throws early on invalid arguments', t => {
    t.throws(_ => {
        []::enumerate(0)
    })
})
