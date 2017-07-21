import test from "ava"
import find from "../../src/sync/find.js"

test('find basic functionality', t => {
    const val = { x: 10, y: 20 }
    const data = [1, { x: 20, y: 'banana' }, 2, 'banana', val, NaN, '']

    t.is(
        data::find(item => item instanceof Object && item.x === 10),
        val
    )

    t.is(
        data::find(item => item === 2),
        2
    )
})

test('find with no argument returns first truthy value', t => {
    const data = [0, '', null, undefined, NaN, false, 1]
    t.is(
        data::find(),
        1
    )
})

test("find throws when it can't find the given element", t => {
    const data = [1,2,3,4]
    t.throws(_ => {
        data::find(x => x === 42)
    })

    const empty = []
    t.throws(_ => {
        empty::find(x => x === 42)
    })
})

test("find returns the default value when it can't find the given element", t => {
    const data = [1,2,3,4]
    t.is(
        data::find(0, x => x === 42),
        0
    )

    const empty = []
    t.is(
        empty::find(0, x => x === 42),
        0
    )
})

test("find.withIndex basic functionality", t => {
    const val = { x: 10, y: 20 }
    const data = [1, { x: 20, y: 'banana' }, 2, 'banana', val, NaN, '']

    t.deepEqual(
        data::find.withIndex(item => item instanceof Object && item.x === 10),
        { item: val, index: 4 }
    )

    t.deepEqual(
        data::find.withIndex(item => item === 2),
        { item: 2, index: 2 }
    )
})

test('find.withIndex with no argument returns first truthy value', t => {
    const data = [0, '', null, undefined, NaN, false, 1]
    t.deepEqual(
        data::find.withIndex(),
        { item: 1, index: 6 }
    )
})

test("find.withIndex throws when it can't find the given element", t => {
    const data = [1,2,3,4]
    try {
        data::find.withIndex(x => x === 42)
        t.fail()
    } catch (e) {
        t.pass()
    }

    const empty = []
    try {
        empty::find.withIndex(x => x === 42)
        t.fail()
    } catch (e) {
        t.pass()
    }
})

test("find.withIndex returns the default value when it can't find the given element", t => {
    const data = [1,2,3,4]
    t.deepEqual(
        data::find.withIndex(0, x => x === 42),
        { item: 0, index: null }
    )

    const empty = []
    t.deepEqual(
        empty::find.withIndex(0, x => x === 42),
        { item: 0, index: null }
    )
})

test('find throws on bad arguments', t => {
    const data = []
    t.throws(_ => {
        data::find(_ => 2, x => x, 3)
    })

    t.throws(_ => {
        data::find(2)
    })
})

test('find.withIndex throws on bad arguments', t => {
    const data = []
    t.throws(_ => {
        data::find.withIndex(2)
    })

    t.throws(_ => {
        data::find.withIndex(_ => 2, 4)
    })
})
