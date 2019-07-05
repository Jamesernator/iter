import test from "ava"
import subSequences from "../../async/subSequences.mjs"
import toArray from "../../async/toArray.mjs"

test("subSequences emits small subSequencess of elements", async t => {
    const seq = [1, 2, 3, 4, 5, 6]
    t.deepEqual(
        await toArray(subSequences(seq, 3)),
        [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]],
    )
})

test("subSequences emits nothing given an Infinite subsequence with allowShorter", async t => {
    const seq = [1, 2, 3, 4, 5]
    t.deepEqual(
        await toArray(subSequences(seq, Infinity, true)),
        [],
    )
})

test("subSequences throws error when sequence is too short", async t => {
    const seq1 = []
    const seq2 = [1, 2]

    await t.throwsAsync(_ => toArray(subSequences(seq1, 3)))
    await t.throwsAsync(_ => toArray(subSequences(seq2, 3)))
})

test("subSequences is empty when sequeunce is too short and allowShorter is used", async t => {
    const seq1 = []
    const seq2 = [1, 2]

    t.deepEqual([], await toArray(subSequences(seq1, 3, true)))
    t.deepEqual([], await toArray(subSequences(seq2, 3, true)))
})

test("subSequences throws early on bad arguments", t => {
    t.throws(_ => subSequences())
    t.throws(_ => subSequences([], 'banana'))
    t.throws(_ => subSequences([], -20))
    t.throws(_ => subSequences([], 0))
    t.throws(_ => subSequences([], 10, '12'))
})

import countClosing from "./helpers/countClosing.mjs"

test("subSequences iterator closing", async t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = subSequences(data, 3)[Symbol.asyncIterator]()

    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
})
