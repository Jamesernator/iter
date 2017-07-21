import test from "ava"
import dualMethod from "../../src/sync/dualMethod.js"

test('dualMethod returns function which is both a method and function', t => {
    const f = dualMethod(function add(x) {
        return this + x
    })

    t.is(
        f(2, 3),
        5
    )

    t.is(
        2::f(3),
        5
    )
})
