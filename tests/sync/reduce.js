import test from "ava"
import reduce from "../../src/sync/reduce.js"

test('reduce without arguments joins sequence using +', t => {
    const target = ['Cat', 'Hat', 'Bat']
    t.is(
        target::reduce(),
        'CatHatBat'
    )
})

test('reduce without initial value', t => {
    const target = ['Cat', 'Hat', 'Bat']
    t.is(
        target::reduce((acc, item) => acc + item.repeat(2)),
        'CatHatHatBatBat'
    )
    t.is(
        target::reduce((acc, item, idx) => acc + item.repeat(idx)),
        'CatHatBatBat'
    )
})

test('reduce without initial value throws on empty sequence', t => {
    const target = []
    try {
        target::reduce((x, y) => x + y)
        t.fail("reduce didn't throw")
    } catch (_) {
        t.pass()
    }
})

test('reduce with initial value', t => {
    const target = ['Cat', 'Hat', 'Bat']
    t.is(
        target::reduce('Tat', (acc, item) => acc + item),
        'TatCatHatBat'
    )
    t.is(
        target::reduce('Tat', (acc, item, idx) => acc + item.repeat(idx)),
        'TatHatBatBat'
    )
})

test("reduce with initial value does not throw on empty sequence", t => {
    const target = []
    try {
        target::reduce('', (x, y) => x + y)
        t.pass()
    } catch (_) {
        t.fail("reduce threw error on empty sequence with initial value")
    }
})
