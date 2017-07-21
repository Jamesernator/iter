import test from "ava"
import any from "../../src/sync/any.js"

test('any without argument returns true if a value is truthy', t => {
    const target1 = [true, 'cats', {}, 1]
    const target2 = [false, 0, '', undefined, null]
    const target3 = [false, 0, {}, '', undefined, null]

    t.true(
        target1::any()
    )

    t.false(
        target2::any()
    )

    t.true(
        target3::any()
    )
})

test('any', t => {
    const target = [1,3,5,7]

    t.true(
        target::any(item => item % 2 === 1)
    )

    t.true(
        target::any(item => item < 5)
    )

    t.false(
        target::any(item => item > 10)
    )
})

test('any vacuously false', t => {
    const target = []

    t.false(
        target::any()
    )

    t.false(
        target::any(x => x === 2e21)
    )
})

test('any throws early with bad arguments', t => {
    try {
        []::any(2)
        t.fail()
    } catch (_) {
        t.pass()
    }

    try {
        []::any(x => x, 'banana')
        t.fail()
    } catch (_) {
        t.pass()
    }
})
