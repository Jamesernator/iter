import test from "ava"
import concat from "../../sync/concat.mjs"
import toArray from "../../sync/toArray.mjs"

test("concat works with single concatentation", t => {
    t.deepEqual(
        toArray(concat([1, 2, 3, 4], [5, 6, 7, 8])),
        [1, 2, 3, 4, 5, 6, 7, 8],
    )

    t.deepEqual(
        toArray(concat([1, 2, 3, 4], [])),
        [1, 2, 3, 4],
    )

    t.deepEqual(
        toArray(concat([], [1, 2, 3, 4])),
        [1, 2, 3, 4],
    )

    t.deepEqual(
        toArray(concat([], [])),
        [],
    )
})

test("concat works with multiple concatentations", t => {
    t.deepEqual(
        toArray(concat([1, 2, 3], [4, 5, 6], [7, 8, 9])),
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
    )
})

test("concat can reuse the same iterable multiple times", t => {
    const x = [1, 2]
    t.deepEqual(
        toArray(concat(x, x, x, x)),
        [1, 2, 1, 2, 1, 2, 1, 2],
    )
})

test("concat can't take zero arguments'", t => {
    t.throws(_ => {
        toArray(concat())
    })
})
