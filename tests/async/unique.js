import test from "ava"
import toArray from "../../async/toArray.mjs"
import unique from "../../async/unique.mjs"
import ArraySet from "es6-array-set"

test("unique doesn't emit items it's already seen before", async t => {
    const data = [1, 2, 3, 4, 1, 2, 5]

    t.deepEqual(
        [1, 2, 3, 4, 5],
        await toArray(unique(data)),
    )
})

test("unique compares by Object.is by default", async t => {
    const data = [NaN, 1, 2, NaN, 3, NaN]

    t.deepEqual(
        [NaN, 1, 2, 3],
        await toArray(unique(data)),
    )
})

test("unique can use a custom set type for comparing equality", async t => {
    const data = [[1, 2], [3, 4], [5, 6], [1, 2], [3, 4], [7, 8]]

    t.deepEqual(
        [[1, 2], [3, 4], [5, 6], [1, 2], [3, 4], [7, 8]],
        await toArray(unique(data)),
    )

    t.deepEqual(
        [[1, 2], [3, 4], [5, 6], [7, 8]],
        await toArray(unique(data, new ArraySet())),
    )
})

test("unique throws early on invalid arguments", t => {
    t.throws(_ => unique())
    t.throws(_ => unique(12))
    t.throws(_ => unique([1, 2, 3], {}))
    // eslint-disable-next-line no-empty-function
    t.throws(_ => unique([1, 2, 3], { get() {}, set() {}, has() {} }, 'foobar'))
})

import countClosing from "./helpers/countClosing.mjs"

test("unique iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = unique(data)[Symbol.asyncIterator]()

    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
})

test("unique iterator closing on set method error", async t => {
    const data = countClosing([1, 2, 3, 4])
    const set = {
        add() { throw "Error" },
        has() { throw "Error" },
    }
    const seq = unique(data, set)[Symbol.asyncIterator]()

    await t.throws(seq.next())
    t.is(data.closed, 1)
})
