import test from "ava"
import length from "../../async/length.mjs"

test("length returns the length of an iterable", async t => {
    const a = [1, 2, 3, 4]
    const b = (async function* foo() {
        yield 1
        yield 2
    })()

    t.is(await length(a), 4)
    t.is(await length(b), 2)
    t.is(await length(b), 0)
})

test("length throws early on invalid arguments", t => {
    t.throws(_ => length())
    t.throws(_ => length(12))
    t.throws(_ => length([1, 2, 3, 4], 'fizzbyzz'))
})
