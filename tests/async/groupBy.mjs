import test from "ava"
import groupBy from "../../async/groupBy.mjs"
import ArrayMap from "es6-array-map"

test('groupBy basic functionality', async t => {
    const groups = await groupBy([1, 2, 3, 4, 5, 6], x => x % 2 === 0 ? 'even': 'odd')
    t.deepEqual(
        groups.get('even'),
        [2, 4, 6],
    )

    t.deepEqual(
        groups.get('odd'),
        [1, 3, 5],
    )
})

test('groupBy custom map type', async t => {
    const data = [[1, 1, 1], [1, 1, 2], [2, 1, 2], [2, 1, 6], [2, 3, 1], [3, 1, 3], [1, 1, 3]]
    const groups = await groupBy(data, new ArrayMap(), x => [x[0], x[1]])

    t.deepEqual(
        groups.get([1, 1]),
        [[1, 1, 1], [1, 1, 2], [1, 1, 3]],
    )

    t.deepEqual(
        groups.get([3, 1]),
        [[3, 1, 3]],
    )
})

test('groupBy defaults to identity', async t => {
    const groups = await groupBy([1, 2, 1, 2, 3, 4, 4])
    t.deepEqual(
        groups.get(1),
        [1, 1],
    )

    t.deepEqual(
        groups.get(3),
        [3],
    )
})

test('groupBy throws early on bad arguments', async t => {
    t.throws(_ => groupBy())
    t.throws(_ => groupBy([], 2))
    // eslint-disable-next-line no-empty-function
    t.throws(_ => groupBy([], undefined, { set() {}, get() {} }))
    // eslint-disable-next-line no-empty-function
    t.throws(_ => groupBy([], { get() {}, set() {}, has() {} }, x => x, []))
    // eslint-disable-next-line no-empty-function
    await t.notThrowsAsync(_ => groupBy([], { set() {}, get() {}, has() {} }, x => x))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing if set throws an error", async t => {
    const data = countClosing([1, 2, 3, 'fizzbuzz', 5, 6, 7])
    await t.throwsAsync(groupBy(data, {
        get() {
            return undefined
        },

        set(val) {
            if (typeof val !== 'number') {
                throw new Error("NaN")
            }
        },

        has() {
            return false
        },
    }, x => x))

    t.is(data.closed, 1)
})

test("iterator closing if iteratee throws an error", async t => {
    const data = countClosing([1, 2, 3, 4])
    await t.throwsAsync(groupBy(data, _ => {
        throw new Error("Error")
    }))
    t.is(data.closed, 1)
})
