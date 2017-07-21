import test from "ava"
import findLastIndex from "../../src/sync/findLastIndex.js"

test('findLastIndex basic functionality', t => {
    const data = [1,2,3,4,5,1]

    t.is(
        data::findLastIndex(x => x === 2),
        1
    )

    t.is(
        data::findLastIndex(x => x === 1),
        5
    )
})

test('findLastIndex throws when no value is found matching predicate', t => {
    const data = [1,2,3,4]
    try {
        data::findLastIndex(x => x === 42)
        t.fail()
    } catch (e) {
        t.pass()
    }
})

test('findLastIndex defaults to index of last truthy value', t => {
    const data = [1, 0, undefined, false, null, '', NaN, 1]
    t.is(
        data::findLastIndex(),
        7
    )
})

test('findLastIndex with fromIndex only considers values after the given index', t => {
    const data = [1,2,3,4,1,2,1,2,1]

    t.is(
        data::findLastIndex(2, x => x === 1),
        8
    )

    try {
        data::findLastIndex(6, x => x === 4)
        t.fail()
    } catch (e) {
        t.pass()
    }
})

test('findLastIndex throws early on bad arguments', t => {
    const data = []
    t.throws(_ => {
        data::findLastIndex(x => x === 42, 2)
    })

    t.throws(_ => {
        data::findLastIndex(2, x => x === 42, 'banana')
    })

    t.throws(_ => {
        data::findLastIndex(4)
    })
})
