import test from "ava"
import debug from "../../sync/debug.mjs"

function* seq() {
    yield 1
    yield 2
    yield 3
}

test('debug invokes the function for each value in the sequence', t => {
    const result = []
    // Exhaust a copy of the iterator
    const items = Array.from(debug(seq(), item => result.push(item)))
    t.deepEqual(result, [1, 2, 3])
    t.deepEqual(items, [1, 2, 3])
})

test('debug mirrors the original sequence', t => {
    const newSeq = debug(seq(), _ => {
        /* Do Nothing */
    })
    t.deepEqual(Array.from(newSeq), [1, 2, 3])
})

test("debug throws early on invalid arguments", t => {
    t.throws(_ => debug())
    t.throws(_ => debug(12))
    t.throws(_ => debug([], 12))
    t.throws(_ => debug([], x => x, []))
})

import countClosing from "./helpers/countClosing.mjs"
import consumeIterator from "./helpers/consumeIterator.mjs"

test("iterator closing", t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = debug(data, _ => _)[Symbol.iterator]()
    consumeIterator(seq, 3)
    seq.return()

    t.is(data.closed, 1)
})
