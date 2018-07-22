import test from "ava"
import all from "../../async/all.mjs"

test('all without argument returns true if all values are truthy', async t => {
    const target1 = [true, 'cats', {}, 1]
    const target2 = [false, 'cats', 0, '', undefined]

    t.true(await all(target1))

    t.false(await all(target2))
})

test('all basic behaviour', async t => {
    const target = [1, 3, 5, 7]

    t.true(await all(target, item => item % 2 === 1))

    t.false(await all(target, item => item < 5))
})

test('all vacuously true', async t => {
    const target = []

    t.true(await all(target))

    t.true(await all(target, x => x === 2e21))
})

test('all throws early with bad arguments', t => {
    t.throws(_ => all())
    t.throws(_ => all([], 2))
    t.throws(_ => all([], x => x, 'banana'))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing", async t => {
    const iter = countClosing([1, 2, 3, 4])

    t.true(await all(iter, x => x > 0))
    t.is(iter.closed, 0)

    t.false(await all(iter, x => x === 2))
    t.is(iter.closed, 1)
})
