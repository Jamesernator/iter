import test from "ava"

// FIXME ava
import _subSequences from "../../src/sync/subSequences.mjs"
const subSequences = _subSequences.default

// FIXME ava
import _toArray from "../../src/sync/toArray.mjs"
const toArray = _toArray.default

test("subSequences emits small subSequencess of elements", t => {
    const seq = [1, 2, 3, 4, 5, 6]
    console.log(toArray(subSequences(seq, 3)))
    t.deepEqual(
        toArray(subSequences(seq, 3)),
        [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]],
    )
})

test("subSequences defaults to 1", t => {
    const seq = [1, 2, 3, 4]
    t.deepEqual(
        toArray(subSequences(seq)),
        [[1], [2], [3], [4]],
    )
})

test("subSequences emits nothing given an Infinite subsequence", t => {
    const seq = [1, 2, 3, 4, 5]
    t.deepEqual(
        toArray(subSequences(seq, Infinity)),
        [],
    )
})

test("subSequences emits nothing when sequence is too short", t => {
    const seq = [1, 2]
    t.deepEqual(
        toArray(subSequences(seq, 3)),
        [],
    )
})

test("subSequences throws early on bad arguments", t => {
    t.throws(_ => {
        subSequences([], 'banana')
    })

    t.throws(_ => {
        subSequences([], -20)
    })

    t.throws(_ => {
        subSequences([], 0)
    })

    t.throws(_ => {
        subSequences([], 10, '12')
    })
})
