import test from "ava"
import toArray from "../../src/sync/toArray.mjs"

test('array converts iterable to array', t => {
    const seq = function* () {
        yield 1
        yield 2
        yield 3
    }
    t.deepEqual(
        toArray(seq()),
        [1, 2, 3],
    )
})

test('array throws early on invalid arguments', t => {
    try {
        toArray([1, 2, 3], 2)
        t.fail()
    } catch (_) {
        t.pass()
    }
})
