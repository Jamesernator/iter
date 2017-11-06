import test from "ava"
import findIndex from "../../src/sync/findIndex.mjs"

test('findIndex finds item if it exists', t => {
    const data = [1, 2, 3, 4]

    t.is(
        findIndex(data, x => x === 3),
        2,
    )
})

test("findIndex throws error if no item is found", t => {
    const data = [1, 2, 3, 4]

    t.throws(_ => findIndex(data, x => x === 42))
})

test('findIndex with no argument returns the index of the first truthy', t => {
    const data = [0, undefined, null, '', NaN, false, 1]

    t.is(
        findIndex(data),
        6,
    )
})

test('findIndex returns default value if not found', t => {
    const data = [1, 2, 3, 4, 1, 2, 1, 2, 1]

    t.is(
        findIndex(data, null, x => x === 42),
        null,
    )

    t.is(
        findIndex(data, null, x => x === 4),
        3,
    )
})

test('findIndex throws early on bad arguments', t => {
    const data = []
    t.throws(_ => {
        findIndex(data, x => x === 42, 2)
    })

    t.throws(_ => {
        findIndex(data, x => x === 42, 'banana')
    })

    t.throws(_ => {
        findIndex(data, 4)
    })
})
