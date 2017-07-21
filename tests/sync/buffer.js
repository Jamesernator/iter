import test from "ava"
import buffer from "../../src/sync/buffer.js"
import array from "../../src/sync/array.js"
import final from "../../src/sync/final.js"

test("buffer", t => {
    const seq = [1,2,3,4,5,6,7,8,9]
    t.deepEqual(
        seq::buffer(3)::array(),
        [[1,2,3], [4,5,6], [7,8,9]]
    )
})

test("buffer with extra elements emits", t => {
    const seq = [1,2,3,4,5,6,7,8]
    t.deepEqual(
        seq::buffer(3)::array(),
        [[1,2,3], [4,5,6], [7,8]]
    )
})

test("buffer with extra elements doesn't emit if ignoreRest is true", t => {
    const seq = [1,2,3,4,5,6,7,8]
    t.deepEqual(
        seq::buffer(3, true)::array(),
        [[1,2,3], [4,5,6]]
    )
})

test("buffer defaults to 1", t => {
    const seq = [1,2,3,4]
    t.deepEqual(
        seq::buffer(1)::array(),
        [[1], [2], [3], [4]]
    )
})

test('buffer preserves completion value', t => {
    const seq = function*() {
        yield 1
        yield 2
        yield 3
        return 'hello'
    }

    t.is(
        seq()::buffer(2)::final(),
        'hello'
    )
})

test("buffer throws early on bad arguments", t => {
    t.throws(_ => {
        []::buffer('banana', null)
    })

    t.throws(_ => {
        []::buffer(-20, true)
    })

    t.throws(_ => {
        []::buffer(1, -2)
    })
})
