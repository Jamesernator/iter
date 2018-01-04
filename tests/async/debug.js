import test from "ava"
import debug from "../../async/debug.mjs"
import toArray from "../../async/toArray.mjs"

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

test('debug defaults to using console.log', async t => {
    const originalLog = Object.getOwnPropertyDescriptor(console, 'log')
    try {
        const result = []
        // Intercept console.log
        console.log = function(value) {
            result.push(value)
        }
        const array = await toArray(debug(seq()))
        t.deepEqual(result, [1, 2, 3])
        t.deepEqual(array, [1, 2, 3])
    } finally {
        Object.defineProperty(console, 'log', originalLog)
    }
})

test("debug throws early on invalid arguments", t => {
    t.throws(_ => debug())
    t.throws(_ => debug(12))
    t.throws(_ => debug([], 12))
    t.throws(_ => debug([], x => x, []))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = debug(data, _ => _)[Symbol.asyncIterator]()
    await seq.next()
    await seq.return()

    t.is(data.closed, 1)
})