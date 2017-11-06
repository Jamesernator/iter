import test from "ava"
import forEach from "../../src/sync/forEach.mjs"

test('each', t => {
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
    t.throws(_ => {
        forEach([], 2)
    })

    t.throws(_ => {
        forEach([], x => x, 2)
    })
})
