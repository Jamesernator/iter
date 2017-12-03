import test from "ava"
import groupBy from "../../sync/groupBy.mjs"
import ArrayMap from "es6-array-map"

test('groupBy basic functionality', t => {
    const groups = groupBy([1, 2, 3, 4, 5, 6], x => x % 2 === 0 ? 'even': 'odd')
    t.deepEqual(
        groups.get('even'),
        [2, 4, 6],
    )

    t.deepEqual(
        groups.get('odd'),
        [1, 3, 5],
    )
})

test('groupBy custom map type', t => {
    const data = [[1, 1, 1], [1, 1, 2], [2, 1, 2], [2, 1, 6], [2, 3, 1], [3, 1, 3], [1, 1, 3]]
    const groups = groupBy(data, new ArrayMap(), x => [x[0], x[1]])

    t.deepEqual(
        groups.get([1, 1]),
        [[1, 1, 1], [1, 1, 2], [1, 1, 3]],
    )

    t.deepEqual(
        groups.get([3, 1]),
        [[3, 1, 3]],
    )
})

test('groupBy defaults to identity', t => {
    const groups = groupBy([1, 2, 1, 2, 3, 4, 4])
    t.deepEqual(
        groups.get(1),
        [1, 1],
    )

    t.deepEqual(
        groups.get(3),
        [3],
    )
})

test('groupBy throws early on bad arguments', t => {
    t.throws(_ => {
        groupBy([], 2)
    })

    t.throws(_ => {
        // eslint-disable-next-line no-empty-function
        groupBy([], undefined, { set() {}, get() {} })
    })

    t.throws(_ => {
        // eslint-disable-next-line no-empty-function
        groupBy([], { get() {}, set() {}, has() {} }, x => x, [])
    })

    t.notThrows(_ => {
        // eslint-disable-next-line no-empty-function
        groupBy([], { set() {}, get() {}, has() {} }, x => x)
    })
})
