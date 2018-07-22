import test from "ava"
import map from "../../async/map.mjs"
import toArray from "../../async/toArray.mjs"

test('map basic functionality', async t => {
    const data = [1, 2, 3]

    t.deepEqual(
        await toArray(map(data, x => x**2)),
        [1, 4, 9],
    )
})

test('map iteratee receives second argument', async t => {
    const data = [11, 22, 33]

    t.deepEqual(
        await toArray(map(data, (x, i) => [x, i])),
        [[11, 0], [22, 1], [33, 2]],
    )
})

test('map iteratee receives no additional arguments', async t => {
    const data = [11, 22, 33]

    await toArray(map(data, (_1, _2, ...rest) => t.is(0, rest.length)))
})

test('map iteratee defaults to identity', async t => {
    const data = [11, 22, 33]

    t.deepEqual(await toArray(map(data)), [11, 22, 33])
})

test('map throws early on invalid arguments', t => {
    const data = [11, 22, 33]

    t.throws(_ => map())
    t.throws(_ => map(data, 12))
    t.throws(_ => map(data, x => x**2, 12))
})

import countClosing from "./helpers/countClosing.mjs"

test("iterator closing on early map close", async t => {
    const data = countClosing([1, 2, 3, 4])
    const seq = map(data, x => x**2)[Symbol.asyncIterator]()

    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
})

test("iterator closing on error in iteratee", async t => {
    const data = countClosing([1, 2, 3, 4])
    await t.throws(toArray(map(data, _ => { throw new Error("Error") })))
    t.is(data.closed, 1)
})
