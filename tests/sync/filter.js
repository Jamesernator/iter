import test from "ava"
import filter from "../../filter.mjs"
import toArray from "../../toArray.mjs"

test('filter basic functionality', t => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    t.deepEqual(
        toArray(filter(data, x => x % 3 === 0)),
        [3, 6, 9],
    )
})

test('filter receives correct arguments', t => {
    const data = [4, 3, 2, 1]

    t.deepEqual(
        toArray(filter(data, (_, idx) => idx % 2 === 0)),
        [4, 2],
    )

    filter(data, (_, __, ...rest) => t.deepEqual(rest, []))
})

test('filter throws early on bad input', t => {
    t.throws(_ => {
        filter([], 2)
    })

    t.throws(_ => {
        filter([], _ => true, 'banana')
    })
})
