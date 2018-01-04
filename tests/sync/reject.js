import test from "ava"
import reject from "../../sync/reject.mjs"
import toArray from "../../sync/toArray.mjs"

test('reject basic functionality', t => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    t.deepEqual(
        toArray(reject(data, x => x % 3 === 0)),
        [1, 2, 4, 5, 7, 8, 10],
    )
})

test('reject receives correct arguments', t => {
    const data = [4, 3, 2, 1]

    t.deepEqual(
        toArray(reject(data, (_, idx) => idx % 2 === 0)),
        [3, 1],
    )

    toArray(reject(data, (_, __, ...rest) => t.deepEqual(rest, [])))
})

test('reject throws early on bad input', t => {
    t.throws(_ => reject())
    t.throws(_ => reject([], 2))
    t.throws(_ => reject([], _ => true, 'banana'))
})

import countClosing from "./helpers/countClosing.mjs"

test("reject iterator closing on early close", t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = reject(data, x => x % 2 === 0)[Symbol.iterator]()

    seq.next()
    seq.return()
    t.is(data.closed, 1)
})

test("reject iterator closing on predicate error", t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = reject(data, _ => { throw "Error" })[Symbol.iterator]()

    t.throws(_ => seq.next())
    t.is(data.closed, 1)
})
