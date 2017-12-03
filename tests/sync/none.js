import test from "ava"
import none from "../../sync/none.mjs"

test("none basic functionality", t => {
    const isEven = i => i % 2 === 0
    const a = [1, 3, 5, 7, 9]
    const b = [1, 2, 3, 4, 5]
    const c = [2, 4, 6, 8]

    t.true(none(a, isEven))
    t.false(none(b, isEven))
    t.false(none(c, isEven))
})

test("none is vacuously true", t => {
    const isEven = i => i % 2 === 0

    t.true(none([], isEven))
})

test("none defaults to identity for truthiness", t => {
    t.true(none([0, false, '', null, undefined]))
    t.false(none([1]))
    t.false(none([{}]))
    t.false(none(['foo']))
})

test("none throws early on invalid arguments", t => {
    t.throws(_ => none([], 12))
    t.throws(_ => none())
    t.throws(_ => none([], x => x**2, 'foobar'))
})
