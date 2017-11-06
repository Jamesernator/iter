import test from "ava"
import debug from "../../src/sync/debug.mjs"

function* seq() {
    yield 1
    yield 2
    yield 3
}

test('debug invokes the function for each value in the sequence', t => {
    const result = []
    // Exhaust a copy of the iterator
    Array.from(debug(seq(), item => result.push(item)))
    t.deepEqual(result, [1, 2, 3])
})

test('debug mirrors the original sequence', t => {
    const newSeq = debug(seq(), _ => { /* Do Nothing */ })
    t.deepEqual(Array.from(newSeq), [1, 2, 3])
})

test('debug defaults to using console.log', t => {
    const originalLog = Object.getOwnPropertyDescriptor(console, 'log')
    try {
        const result = []
        // Intercept console.log
        console.log = function(value) {
            result.push(value)
        }
        const newSeq = Array.from(debug(seq()))
        t.deepEqual(result, [1, 2, 3])
        t.deepEqual(Array.from(newSeq), [1, 2, 3])
    } finally {
        Object.defineProperty(console, 'log', originalLog)
    }
})
