import test from "ava"
import findLastIndex from "../../src/sync/findLastIndex.mjs"

test('findLastIndex basic functionality', t => {
    const data = [1, 2, 3, 4, 5, 1]

    t.is(
        findLastIndex(data, x => x === 2),
        1,
    )

    t.is(
        findLastIndex(data, x => x === 1),
        5,
    )
})

test('findLastIndex throws when no value is found matching predicate', t => {
    const data = [1, 2, 3, 4]
    t.throws(_ => findLastIndex(data, x => x === 42))
})

test('findLastIndex defaults to index of last truthy value', t => {
    const data = [1, 0, undefined, false, null, '', NaN, 1, false]
    t.is(
        findLastIndex(data),
        7,
    )
})

test('findLastIndex with default returns default is not found', t => {
    const data = [1, 2, 3, 4, 3, 12]

    t.is(
        findLastIndex(data, null, x => x === 42),
        null,
    )

    t.is(
        findLastIndex(data, 'banana', x => x === 42),
        'banana',
    )

    t.is(
        findLastIndex(data, null, x => x === 3),
        4,
    )
})

test('findLastIndex throws early on bad arguments', t => {
    const data = []
    t.throws(_ => {
        findLastIndex(data, x => x === 42, 2)
    })

    t.throws(_ => {
        findLastIndex(data, 2, x => x === 42, 'banana')
    })

    t.throws(_ => {
        findLastIndex(data, 4)
    })
})
