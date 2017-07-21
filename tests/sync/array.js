import test from "ava"
import array from "../../src/sync/array.js"

test('array converts iterable to array', t => {
    const seq = function*() {
        yield 1
        yield 2
        yield 3
    }
    t.deepEqual(
        seq()::array(),
        [1,2,3]
    )
})

test('array throws early on invalid arguments', t => {
    try {
        [1,2,3]::array(2)
        t.fail()
    } catch (_) {
        t.pass()
    }
})
