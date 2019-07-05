import test from "ava"
import toArray from "../../async/toArray.js"

test('array converts iterable to array', async t => {
    const seq = async function* () {
        yield 1
        yield 2
        yield 3
    }
    t.deepEqual(
        await toArray(seq()),
        [1, 2, 3],
    )
})

test('array throws early on invalid arguments', t => {
    t.throws(_ => toArray())
    t.throws(_ => toArray(12))
    t.throws(_ => toArray([1, 2, 3], 2))
})
