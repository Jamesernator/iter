import test from "ava"
import countBy from "../../src/sync/countBy.js"
import array from "../../src/sync/array.js"
import ArrayMap from "es6-array-map"

test("countBy no arguments", t => {
    const data = [1,2,3,4,1,2,3,3,3]
    t.deepEqual(
        data::countBy()
            .entries()
            ::array()
            .sort((a, b) => a[0] - b[0]),
        [[1, 2], [2, 2], [3, 4], [4, 1]]
    )
})

test("countBy with key function", t => {
    const data = [1,2,3,4,5,4,3,2,5,2,3,1,6,2,2,23,3]
    const evens = data.filter(item => item % 2 === 0)
    const odds = data.filter(item => item % 2 === 1)


    const counts = data
        ::countBy(item => item % 2 === 0 ? 'even' : 'odd')

    t.is(
        counts.get('even'),
        evens.length
    )

    t.is(
        counts.get('odd'),
        odds.length
    )
})

test("countBy with custom map object", t => {
    const data = [[1,1], [1,2], [1,1], [4,5]]

    const counts = data
        ::countBy(null, new ArrayMap())

    t.is(
        counts.get([1,2]),
        1
    )

    t.is(
        counts.get([1,1]),
        2
    )

    t.is(
        counts.get([99,99]),
        undefined
    )
})

test("countBy with custom map object and key function", t => {
    const data = [[1,1], [1,2], [1,1], [4,5]]

    const counts = data
        ::countBy(([a, b]) => [a*2, b*2], new ArrayMap())

    t.is(
        counts.get([2,4]),
        1
    )

    t.is(
        counts.get([2,2]),
        2
    )

    t.is(
        counts.get([1,1]),
        undefined
    )
})

test("countBy throws early on invalid arguments", t => {
    t.throws(_ => {
        []::countBy(2)
    })

    t.throws(_ => {
        []::countBy(null, { x: 10 })
    })

    t.throws(_ => {
        []::countBy(null, {
            get() { /**/ },
            set() { /**/ }
        })
    })

    t.notThrows(_ => {
        []::countBy(null, {
            get() { /**/ },
            set() { /**/ },
            has() { /**/ }
        })
    })
})
