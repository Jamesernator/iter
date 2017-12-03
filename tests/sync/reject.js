import test from "ava"
import reject from "../../sync/reject.mjs"
import toArray from "../../sync/toArray.mjs"

test('reject basic functionality', t => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    t.deepEqual(
        toArray(reject(data, x => x % 3 === 0)),
        [1, 2, 4, 5, 7, 8, 10],
    )
})

test('reject receives correct arguments', t => {
    const data = [4, 3, 2, 1]

    t.deepEqual(
        toArray(reject(data, (_, idx) => idx % 2 === 0)),
        [3, 1],
    )

    reject(data, (_, __, ...rest) => t.deepEqual(rest, []))
})

test('reject throws early on bad input', t => {
    t.throws(_ => reject([], 2))

    t.throws(_ => reject([], _ => true, 'banana'))
})
