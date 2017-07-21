import test from "ava"
import final from "../../src/sync/final.js"

test('final gets the last value emitted', t => {
    const seq = function*() {
        yield 1
        yield 2
        return "banana"
    }

    t.is(
        seq()::final(),
        "banana"
    )
})

test('final throws early on bad arguments', t => {
    t.throws(_ => {
        []::final(2)
    })
})
