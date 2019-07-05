import test from "ava"
import none from "../../async/none.mjs"

test("none basic functionality", async t => {
    const isEven = i => i % 2 === 0
    const a = [1, 3, 5, 7, 9]
    const b = [1, 2, 3, 4, 5]
    const c = [2, 4, 6, 8]

    t.true(await none(a, isEven))
    t.false(await none(b, isEven))
    t.false(await none(c, isEven))
})

test("none is vacuously true", async t => {
    const isEven = i => i % 2 === 0

    t.true(await none([], isEven))
})

test("none defaults to identity for truthiness", async t => {
    t.true(await none([0, false, '', null, undefined]))
    t.false(await none([1]))
    t.false(await none([{}]))
    t.false(await none(['foo']))
})

test("none throws early on invalid arguments", t => {
    t.throws(_ => none())
    t.throws(_ => none([], 12))
    t.throws(_ => none([], x => x**2, 'foobar'))
})

import countClosing from "./helpers/countClosing.mjs"

test("none iterator closing on early find", async t => {
    const data = countClosing([1, 2, 3, 4])
    await none(data, x => x === 2)
    t.is(data.closed, 1)
})

test("none iterator closing on predicate error", async t => {
    const data = countClosing([1, 2, 3, 4])
    await t.throwsAsync(none(data, _ => { throw new Error("Error") }))
    t.is(data.closed, 1)
})
