import test from "ava"
import reduce from "../../sync/reduce.mjs"

test('reduce without arguments joins sequence using +', t => {
    const target = ['Cat', 'Hat', 'Bat']
    t.is(
        reduce(target),
        'CatHatBat',
    )
})

test('reduce without initial value', t => {
    const target = ['Cat', 'Hat', 'Bat']
    t.is(
        reduce(target, (acc, item) => acc + item.repeat(2)),
        'CatHatHatBatBat',
    )
    t.is(
        reduce(target, (acc, item, idx) => acc + item.repeat(idx)),
        'CatHatBatBat',
    )
})

test('reduce without initial value throws on empty sequence', t => {
    const target = []
    try {
        reduce(target, (x, y) => x + y)
        t.fail("reduce didn't throw")
    } catch (_) {
        t.pass()
    }
})

test('reduce with initial value', t => {
    const target = ['Cat', 'Hat', 'Bat']
    t.is(
        reduce(target, 'Tat', (acc, item) => acc + item),
        'TatCatHatBat',
    )
    t.is(
        reduce(target, 'Tat', (acc, item, idx) => acc + item.repeat(idx)),
        'TatHatBatBat',
    )
})

test("reduce with initial value does not throw on empty sequence", t => {
    const target = []
    try {
        reduce(target, '', (x, y) => x + y)
        t.pass()
    } catch (_) {
        t.fail("reduce threw error on empty sequence with initial value")
    }
})

test("reduce throws early on invalid arguments", t => {
    t.throws(_ => reduce())
    t.throws(_ => reduce(12))
    t.throws(_ => reduce([], i => i, 12))
    t.throws(_ => reduce([], 11, 'banana'))
})

import countClosing from "./helpers/countClosing.mjs"

test("reduce closing on iteratee error", t => {
    const data = countClosing([1, 2, 3, 4])
    t.throws(_ => reduce(data, _ => { throw "Error" }))
    t.is(data.closed, 1)
})
