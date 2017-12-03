import test from "ava"
import all from "../../sync/all.mjs"

test('all without argument returns true if all values are truthy', t => {
    const target1 = [true, 'cats', {}, 1]
    const target2 = [false, 'cats', 0, '', undefined]

    t.true(all(target1))

    t.false(all(target2))
})

test('all basic behaviour', t => {
    const target = [1, 3, 5, 7]

    t.true(all(target, item => item % 2 === 1))

    t.false(all(target, item => item < 5))
})

test('all vacuously true', t => {
    const target = []

    t.true(all(target))

    t.true(all(target, x => x === 2e21))
})

test('all throws early with bad arguments', t => {
    try {
        all([], 2)
        t.fail()
    } catch (_) {
        t.pass()
    }

    try {
        all([], x => x, 'banana')
        t.fail()
    } catch (_) {
        t.pass()
    }
})
