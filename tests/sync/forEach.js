import test from "ava"
import each from "../../src/sync/each.js"

test('each', t => {
    const seq = (function*() {
        yield 1
        yield 2
        yield 3
        return "complete"
    }())
    const result = []
    const final = seq::each(item => result.push(item))
    t.deepEqual(result, [1,2,3])
    t.is(final, "complete")
})

test('each throws early on invalid arguments', t => {
    t.throws(_ => {
        []::each(2)
    })

    t.throws(_ => {
        []::each(x => x, 2)
    })
})
