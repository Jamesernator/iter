import test from "ava"
import debug from "../../async/debug.js"
import toArray from "../../async/toArray.js"

async function* seq() {
    yield 1
    yield 2
    yield 3
}

test('debug invokes the function for each value in the sequence', async t => {
    const result = []
    // Exhaust a copy of the iterator
    for await (const item of seq()) {
        result.push(item)
    }
    t.deepEqual(result, [1, 2, 3])
})

test('debug mirrors the original sequence', async t => {
    const newSeq = debug(seq(), _ => {
        /* Do Nothing */
    })
    t.deepEqual(await toArray(newSeq), [1, 2, 3])
})

test("debug throws early on invalid arguments", t => {
    t.throws(_ => debug())
    t.throws(_ => debug(12))
    t.throws(_ => debug([], 12))
    t.throws(_ => debug([], x => x, []))
})

import CountClosing from "./helpers/CountClosing.js"

test("iterator closing", async t => {
    const data = CountClosing([1, 2, 3, 4])
    const seq = debug(data, _ => _)[Symbol.asyncIterator]()
    await seq.next()
    await seq.return()

    t.is(data.closed, 1)
})
