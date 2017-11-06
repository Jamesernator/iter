import test from "ava"
import findLast from "../../src/sync/findLast.mjs"

test('findLast basic functionality', t => {
    const val = { x: 20, y: 20 }
    const data = [1, { x: 20, y: 'banana' }, 2, 'banana', val, NaN, '']

    t.is(
        findLast(data, item => item instanceof Object && item.x === 20),
        val,
    )

    t.is(
        findLast(data, item => item === 2),
        2,
    )
})

test('findLast with no argument returns first truthy value', t => {
    const data = [10, 0, '', null, undefined, NaN, false, 1]
    t.is(
        findLast(data),
        1,
    )
})

test("findLast throws when it can't find any such element", t => {
    const data = [1, 2, 3, 4]
    t.throws(_ => {
        findLast(data, x => x === 42)
    })

    const empty = []
    t.throws(_ => {
        findLast(empty, x => x === 42)
    })
})

test("findLast returns the default when provided and it can't find any such element", t => {
    const data = [1, 2, 3, 4]
    t.is(
        findLast(data, 0, x => x === 42),
        0,
    )

    const empty = []
    t.is(
        empty::findLast(0, x => x === 42),
        0,
    )

    t.is(
        findLast(data, 'banana', x => x === 42),
        'banana',
    )
})

test('findLast throws on bad arguments', t => {
    const data = []
    t.throws(_ => {
        findLast(data, _ => 2, x => x, 3)
    })

    t.throws(_ => {
        findLast(data, 2)
    })
})
