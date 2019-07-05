import test from "ava"
import flatMap from "../../sync/flatMap.js"
import toArray from "../../sync/toArray.js"

test('flatMap basic functionality', t => {
    const data = [1, 2, 3, 4]

    t.deepEqual(
        toArray(flatMap(data, x => [x, x])),
        [1, 1, 2, 2, 3, 3, 4, 4],
    )
    t.deepEqual(
        toArray(flatMap(data, x => [[x, x]])),
        [[1, 1], [2, 2], [3, 3], [4, 4]],
    )
})

test("flatMap doesn't flatten non-iterables", t => {
    const data = [1, 2, 3, 4]

    t.throws(_ => toArray(flatMap(data, x => x)))

    t.throws(_ => toArray(flatMap(data, x => x % 2 === 0 ? [] : x)))
})

test("flatMap can ignore non-iterables if requested", t => {
    const data = [1, 2, 3, 4]

    t.deepEqual(
        toArray(flatMap(data, true, x => x)),
        [1, 2, 3, 4],
    )

    t.deepEqual(
        toArray(flatMap(data, true, x => x % 2 === 0 ? [] : x)),
        [1, 3],
    )
})

test('flatMap throws early on bad arguments', t => {
    t.throws(_ => flatMap())
    t.throws(_ => flatMap([], 'banana'))
    t.throws(_ => flatMap([], 2, 'fishBiscuit'))
    t.throws(_ => flatMap([], x => x**2, -3))
})

import CountClosing from "./helpers/CountClosing.js"

test("iterator closing", t => {
    const data = CountClosing([1, 2, 3, 4])
    const inner = CountClosing([1, 2])
    const seq = flatMap(data, _ => inner)[Symbol.iterator]()
    seq.next()
    seq.return()
    t.is(data.closed, 1)
    t.is(inner.closed, 1)
})
