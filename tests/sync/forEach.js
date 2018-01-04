import test from "ava"
import forEach from "../../sync/forEach.mjs"

test('each basic functionality', t => {
    const seq = (function* () {
        yield 1
        yield 2
        yield 3
        return "complete"
    }())
    const result = []
    forEach(seq, item => result.push(item))
    t.deepEqual(result, [1, 2, 3])
})

test('each throws early on invalid arguments', t => {
    t.throws(_ => forEach())
    t.throws(_ => forEach([], 2))
    t.throws(_ => forEach([], x => x, 2))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing on iteratee error", t => {
    const data = countClosing([1, 2, 3, 4])
    t.throws(_ => forEach(data, _ => { throw "Error" }))
    t.is(data.closed, 1)
})
