import test from "ava"
import map from "../../sync/map.mjs"
import toArray from "../../sync/toArray.mjs"

test('map basic functionality', t => {
    const data = [1, 2, 3]

    t.deepEqual(
        toArray(map(data, x => x**2)),
        [1, 4, 9],
    )
})

test('map iteratee receives second argument', t => {
    const data = [11, 22, 33]

    t.deepEqual(
        toArray(map(data, (x, i) => [x, i])),
        [[11, 0], [22, 1], [33, 2]],
    )
})

test('map iteratee receives no additional arguments', t => {
    const data = [11, 22, 33]

    toArray(map(data, (_1, _2, ...rest) => t.is(0, rest.length)))
})

test('map iteratee defaults to identity', t => {
    const data = [11, 22, 33]

    t.deepEqual(toArray(map(data)), [11, 22, 33])
})

test('map throws early on invalid arguments', t => {
    const data = [11, 22, 33]

    t.throws(_ => map())
    t.throws(_ => map(data, 12))
    t.throws(_ => map(data, x => x**2, 12))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing on early map close", t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = map(data, x => x**2)[Symbol.iterator]()

    seq.next()
    seq.return()
    t.is(data.closed, 1)
})

test("iterator closing on error in iteratee", t => {
    const data = countClosing([1, 2, 3, 4])
    t.throws(_ => [...map(data, _ => { throw "Error" })])
    t.is(data.closed, 1)
})
