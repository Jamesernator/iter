import test from "ava"
import pairWise from "../../sync/pairWise.mjs"
import toArray from "../../sync/toArray.mjs"

test("pairWise basic functionality", t => {
    const data = [1, 2, 3, 4, 5, 6, 7]

    t.deepEqual(
        toArray(pairWise(data)),
        [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    )

    const data2 = [1, 2]

    t.deepEqual(toArray(pairWise(data2)), [[1, 2]])
})

test("pairWise emits nothing on arrays of insufficient length", t => {
    const data = [1]

    t.deepEqual(
        toArray(pairWise(data)),
        [],
    )

    const data2 = []

    t.deepEqual(toArray(pairWise(data2)), [])
})

test("pairWise throws early on invalid arguments", t => {
    t.throws(_ => pairWise([], 'foo'))
    t.throws(_ => pairWise())
    t.throws(_ => pairWise(null))
})
