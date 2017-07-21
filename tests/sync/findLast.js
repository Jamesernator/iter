import test from "ava"
import findLast from "../../src/sync/findLast.js"

test('findLast basic functionality', t => {
    const val = { x: 20, y: 20 }
    const data = [1, { x: 20, y: 'banana' }, 2, 'banana', val, NaN, '']

    t.is(
        data::findLast(item => item instanceof Object && item.x === 20),
        val
    )

    t.is(
        data::findLast(item => item === 2),
        2
    )
})

test('findLast with no argument returns first truthy value', t => {
    const data = [10, 0, '', null, undefined, NaN, false, 1]
    t.is(
        data::findLast(),
        1
    )
})

test("findLast throws when it can't find any such element", t => {
    const data = [1,2,3,4]
    t.throws(_ => {
        data::findLast(x => x === 42)
    })

    const empty = []
    t.throws(_ => {
        empty::findLast(x => x === 42)
    })
})

test("findLast returns the default when provided and it can't find any such element", t => {
    const data = [1,2,3,4]
    t.is(
        data::findLast(0, x => x === 42),
        0
    )

    const empty = []
    t.is(
        empty::findLast(0, x => x === 42),
        0
    )
})

test("findLast.withIndex basic functionality", t => {
    const val = { x: 20, y: 20 }
    const data = [1, { x: 20, y: 'banana' }, 2, 'banana', val, NaN, '']

    t.deepEqual(
        data::findLast.withIndex(item => item instanceof Object && item.x === 20),
        { item: val, index: 4 }
    )

    t.deepEqual(
        data::findLast.withIndex(item => item === 2),
        { item: 2, index: 2 }
    )
})

test('findLast.withIndex with no argument returns first truthy value', t => {
    const data = [1, 0, '', null, undefined, NaN, false, 1]
    t.deepEqual(
        data::findLast.withIndex(),
        { item: 1, index: 7 }
    )
})

test("findLast.withIndex throws when it can't findLast the given element", t => {
    const data = [1,2,3,4]
    try {
        data::findLast.withIndex(x => x === 42)
        t.fail()
    } catch (e) {
        t.pass()
    }

    const empty = []
    try {
        empty::findLast.withIndex(x => x === 42)
        t.fail()
    } catch (e) {
        t.pass()
    }
})

test("findLast.withIndex returns the default value when it can't findLast the given element", t => {
    const data = [1,2,3,4]
    t.deepEqual(
        data::findLast.withIndex(0, x => x === 42),
        { item: 0, index: null }
    )

    const empty = []
    t.deepEqual(
        empty::findLast.withIndex(0, x => x === 42),
        { item: 0, index: null }
    )
})

test('findLast throws on bad arguments', t => {
    const data = []
    t.throws(_ => {
        data::findLast(_ => 2, x => x, 3)
    })

    t.throws(_ => {
        data::findLast(2)
    })
})

test('findLast.withIndex throws on bad arguments', t => {
    const data = []
    t.throws(_ => {
        data::findLast.withIndex(2)
    })

    t.throws(_ => {
        data::findLast.withIndex(_ => 2, 4)
    })
})
