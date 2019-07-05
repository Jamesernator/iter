import test from "ava"
import toSet from "../../async/toSet.mjs"

test("set returns a set from a given sequence", async t => {
    async function* data() {
        yield 1
        yield 2
        yield 3
        yield 3
    }

    const s = await toSet(data())
    t.true(s.has(1))
    t.true(s.has(2))
    t.true(s.has(3))
    t.true(s instanceof Set)
    t.is(s.size, 3)
})

test("set throws early on invalid arguments", t => {
    const data = [1, 2, 3, 1, 2, 3]
    t.throws(_ => toSet())
    t.throws(_ => toSet(data, new Set()))
    t.throws(_ => toSet(data, 'foobar'))
})
