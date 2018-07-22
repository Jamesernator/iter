import test from "ava"
import countBy from "../../async/countBy.mjs"
import toArray from "../../sync/toArray.mjs"
import ArrayMap from "es6-array-map"

test("countBy no arguments", async t => {
    const data = [1, 2, 3, 4, 1, 2, 3, 3, 3]
    t.deepEqual(
        toArray(await countBy(data)).sort((a, b) => a[0] - b[0]),
        [[1, 2], [2, 2], [3, 4], [4, 1]],
    )
})

test("countBy with key function", async t => {
    const data = [1, 2, 3, 4, 5, 4, 3, 2, 5, 2, 3, 1, 6, 2, 2, 23, 3]
    const evens = data.filter(item => item % 2 === 0)
    const odds = data.filter(item => item % 2 === 1)

    const counts = await countBy(
        data,
        item => item % 2 === 0 ? 'even' : 'odd',
    )

    t.is(
        counts.get('even'),
        evens.length,
    )

    t.is(
        counts.get('odd'),
        odds.length,
    )
})

test("countBy with custom map object", async t => {
    const data = [[1, 1], [1, 2], [1, 1], [4, 5]]

    const counts = await countBy(data, new ArrayMap())

    t.is(
        counts.get([1, 2]),
        1,
    )

    t.is(
        counts.get([1, 1]),
        2,
    )

    t.is(
        counts.get([99, 99]),
        undefined,
    )
})

test("countBy with custom map object and key function", async t => {
    const data = [[1, 1], [1, 2], [1, 1], [4, 5]]

    const counts = await countBy(data, new ArrayMap(), ([a, b]) => [a*2, b*2])

    t.is(
        counts.get([2, 4]),
        1,
    )

    t.is(
        counts.get([2, 2]),
        2,
    )

    t.is(
        counts.get([1, 1]),
        undefined,
    )
})

/* eslint-disable no-empty-function */
test("countBy throws early on invalid arguments", async t => {
    t.throws(_ => countBy([], 2))
    t.throws(_ => countBy([], null, { x: 10 }))

    t.throws(_ => countBy([], null, {
        get() { },
        set() { },
    }))

    await t.notThrows(_ => countBy([], {
        get() { },
        set() { },
    }))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing when an error is thrown in a set method", async t => {
    const data = countClosing([1, 2, 3, 'foo', 12, 13])
    await t.throws(countBy(data, {
        get() {
            return undefined
        },

        set(val) {
            if (typeof val !== 'number') {
                throw new Error("Not a number")
            }
        },
    }))

    t.is(data.closed, 1)
})
