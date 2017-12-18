import test from "ava"
import toArray from "../../sync/toArray.mjs"
import unique from "../../sync/unique.mjs"
import ArraySet from "es6-array-set"

test("unique doesn't emit items it's already seen before", t => {
    const data = [1, 2, 3, 4, 1, 2, 5]

    t.deepEqual(
        [1, 2, 3, 4, 5],
        toArray(unique(data)),
    )
})

test("unique compares by Object.is by default", t => {
    const data = [NaN, 1, 2, NaN, 3, NaN]

    t.deepEqual(
        [NaN, 1, 2, 3],
        toArray(unique(data)),
    )
})

test("unique can use a custom set type for comparing equality", t => {
    const data = [[1, 2], [3, 4], [5, 6], [1, 2], [3, 4], [7, 8]]

    t.deepEqual(
        [[1, 2], [3, 4], [5, 6], [1, 2], [3, 4], [7, 8]],
        toArray(unique(data)),
    )

    t.deepEqual(
        [[1, 2], [3, 4], [5, 6], [7, 8]],
        toArray(unique(data, new ArraySet())),
    )
})
