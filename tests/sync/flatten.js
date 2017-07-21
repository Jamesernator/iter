import test from "ava"
import flatten from "../../src/sync/flatten.js"
import array from "../../src/sync/array.js"
import final from "../../src/sync/final.js"

test('flatten basic functionality', t => {
    const data = [1, [2, 3], [[4, 5], [6]], 7, [[[8]]], 9, 10]

    t.deepEqual(
        data::flatten()::array(),
        [1,2,3,4,5,6,7,8,9,10]
    )

    t.deepEqual(
        data::flatten(1)::array(),
        [1, 2, 3, [4, 5], [6], 7, [[8]], 9, 10]
    )
})

test('flatten with custom choice function', t => {
    const data = [1, [2, 3], [4, 5], [2, 2]]

    t.deepEqual(
        data::flatten(1, item => item[0] === 2)::array(),
        [1, 2, 3, [4, 5], 2, 2]
    )
})

test('flatten preserves completion value', t => {
    const seq = function*() {
        yield [1,1]
        yield [2,2]
        return 'hello'
    }

    t.is(
        seq()::flatten()::final(),
        'hello'
    )
})

test('flatten throws early on bad arguments', t => {
    t.throws(_ => {
        []::flatten('banana')
    })

    t.throws(_ => {
        []::flatten(2, 'fishBiscuit')
    })

    t.notThrows(_ => {
        []::flatten(null, _ => true)
    })
})
