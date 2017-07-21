import test from "ava"
import groupBy from "../../src/sync/groupBy.js"
import ArrayMap from "es6-array-map"

test('groupBy basic functionality', t => {
    const groups = [1,2,3,4,5,6]::groupBy(x => x % 2 === 0 ? 'even': 'odd')
    t.deepEqual(
        groups.get('even'),
        [2,4,6]
    )

    t.deepEqual(
        groups.get('odd'),
        [1,3,5]
    )
})

test('groupBy custom map type', t => {
    const groups = [[1,1,1], [1,1,2], [2,1,2], [2,1,6], [2,3,1], [3,1,3], [1,1,3]]
        ::groupBy(x => [x[0], x[1]], new ArrayMap())

    t.deepEqual(
        groups.get([1,1]),
        [[1,1,1], [1,1,2], [1,1,3]]
    )

    t.deepEqual(
        groups.get([3,1]),
        [[3,1,3]]
    )
})

test('groupBy defaults to item', t => {
    const groups = [1,2,1,2,3,4,4]::groupBy()
    t.deepEqual(
        groups.get(1),
        [1,1]
    )

    t.deepEqual(
        groups.get(3),
        [3]
    )
})

test('groupBy throws early on bad arguments', t => {
    t.throws(_ => {
        []::groupBy(2)
    })

    t.throws(_ => {
        // eslint-disable-next-line no-empty-function
        []::groupBy(undefined, { set() {}, get() {} })
    })

    t.notThrows(_ => {
        // eslint-disable-next-line no-empty-function
        []::groupBy(x => x, { set() {}, get() {}, has() {} })
    })
})
