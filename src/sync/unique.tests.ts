import test from "ava"
import toArray from "../../sync/toArray.js"
import unique from "../../sync/unique.js"
import ArraySet from "es6-array-set"

test("unique doesn't emit items it's already seen before", t => {
    const data = [1, 2, 3, 4, 1, 2, 5]

    t.deepEqual(
        [1, 2, 3, 4, 5],
        toArray(unique(data)),
    )
})

test("unique compares by Object.is by default", t => {
    const data = [NaN, 1, 2, NaN, 3, NaN]

    t.deepEqual(
        [NaN, 1, 2, 3],
        toArray(unique(data)),
    )
})

test("unique can use a custom set type for comparing equality", t => {
    const data = [[1, 2], [3, 4], [5, 6], [1, 2], [3, 4], [7, 8]]

    t.deepEqual(
        [[1, 2], [3, 4], [5, 6], [1, 2], [3, 4], [7, 8]],
        toArray(unique(data)),
    )

    t.deepEqual(
        [[1, 2], [3, 4], [5, 6], [7, 8]],
        toArray(unique(data, new ArraySet())),
    )
})

test("unique throws early on invalid arguments", t => {
    t.throws(_ => unique())
    t.throws(_ => unique(12))
    t.throws(_ => unique([1, 2, 3], {}))
    // eslint-disable-next-line no-empty-function
    t.throws(_ => unique([1, 2, 3], { get() {}, set() {}, has() {} }, 'foobar'))
})

import CountClosing from "./helpers/CountClosing.js"

test("unique iterator closing", t => {
    const data = CountClosing([1, 2, 3, 4])
    const seq = unique(data)[Symbol.iterator]()

    seq.next()
    seq.return()
    t.is(data.closed, 1)
})

test("unique iterator closing on set method error", t => {
    const data = CountClosing([1, 2, 3, 4])
    const set = {
        add() { throw new Error("Error") },
        has() { throw new Error("Error") },
    }
    const seq = unique(data, set)[Symbol.iterator]()

    t.throws(_ => seq.next())
    t.is(data.closed, 1)
})
