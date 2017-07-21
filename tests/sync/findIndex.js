import test from "ava"
import findIndex from "../../src/sync/findIndex.js"

test('findIndex finds item if it exists', t => {
    const data = [1,2,3,4]

    t.is(
        data::findIndex(x => x === 3),
        2
    )
})

test("findIndex throws error if no item is found", t => {
    const data = [1,2,3,4]

    try {
        data::findIndex(x => x === 42)
        t.fail()
    } catch (e) {
        t.pass()
    }
})

test('findIndex with no argument returns the index of the first truthy', t => {
    const data = [0, undefined ,null, '', NaN, false, 1]

    t.is(
        data::findIndex(),
        6
    )
})

test('findIndex with fromIndex only considers values after the given index', t => {
    const data = [1,2,3,4,1,2,1,2,1]

    t.is(
        data::findIndex(2, x => x === 1),
        4
    )

    try {
        data::findIndex(6, x => x === 4)
        t.fail()
    } catch (e) {
        t.pass()
    }
})

test('findIndex throws early on bad arguments', t => {
    const data = []
    t.throws(_ => {
        data::findIndex(x => x === 42, 2)
    })

    t.throws(_ => {
        data::findIndex(2, x => x === 42, 'banana')
    })

    t.throws(_ => {
        data::findIndex(4)
    })
})
