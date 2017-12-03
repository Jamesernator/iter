import test from "ava"
import pairs from "../../sync/pairs.mjs"
import toArray from "../../sync/toArray.mjs"

test("pairs basic functionality", t => {
    const data = [1, 2, 3, 4, 5, 6, 7]

    t.deepEqual(
        toArray(pairs(data)),
        [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    )

    const data2 = [1, 2]

    t.deepEqual(toArray(pairs(data2)), [[1, 2]])
})

test("pairs emits nothing on arrays of insufficient length", t => {
    const data = [1]

    t.deepEqual(
        toArray(pairs(data)),
        [],
    )

    const data2 = []

    t.deepEqual(toArray(pairs(data2)), [])
})

test("pairs throws early on invalid arguments", t => {
    t.throws(_ => pairs([], 'foo'))
    t.throws(_ => pairs())
    t.throws(_ => pairs(null))
})
