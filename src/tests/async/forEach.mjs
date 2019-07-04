import test from "ava"
import forEach from "../../async/forEach.mjs"

test('each basic functionality', async t => {
    const seq = (async function* () {
        yield 1
        yield 2
        yield 3
        return "complete"
    }())
    const result = []
    await forEach(seq, item => result.push(item))
    t.deepEqual(result, [1, 2, 3])
})

test('each throws early on invalid arguments', t => {
    t.throws(_ => forEach())
    t.throws(_ => forEach([], 2))
    t.throws(_ => forEach([], x => x, 2))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing on iteratee error", async t => {
    const data = countClosing([1, 2, 3, 4])
    await t.throwsAsync(forEach(data, _ => { throw new Error("Error") }))
    t.is(data.closed, 1)
})
