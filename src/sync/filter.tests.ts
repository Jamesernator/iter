import test from "ava"
import filter from "../../sync/filter.js"
import toArray from "../../sync/toArray.js"

test('filter basic functionality', t => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    t.deepEqual(
        toArray(filter(data, x => x % 3 === 0)),
        [3, 6, 9],
    )
})

test('filter receives correct arguments', t => {
    const data = [4, 3, 2, 1]

    t.deepEqual(
        toArray(filter(data, (_, idx) => idx % 2 === 0)),
        [4, 2],
    )

    toArray(filter(data, (_, __, ...rest) => t.deepEqual(rest, [])))
})

test('filter throws early on bad input', t => {
    t.throws(_ => filter())
    t.throws(_ => filter([], 2))
    t.throws(_ => filter([], _ => true, 'banana'))
})

import CountClosing from "./helpers/CountClosing.js"

test("filter iterator closing", t => {
    const data = CountClosing([1, 2, 3, 4])
    const seq = filter(data, x => x % 2 === 0)[Symbol.iterator]()

    seq.next()
    seq.return()
    t.is(data.closed, 1)
})

test("filter iterator closing on iteratee error", t => {
    const data = CountClosing([1, 2, 3, 4])
    const seq = filter(data, _ => {
        throw new Error("Error")
    })[Symbol.iterator]()

    t.throws(_ => seq.next())
    t.is(data.closed, 1)
})