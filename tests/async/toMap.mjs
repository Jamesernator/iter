import test from "ava"
import toMap from "../../async/toMap.mjs"

test("toMap converts a sequence of iterables into a map", async t => {
    const pair = (value1, value2) => ({
        * [Symbol.iterator]() {
            yield value1
            yield value2
            this.extra = true
        },
    })

    const pairs = [pair(1, 2), pair(3, 4), pair(4, 5)]

    async function* values() {
        yield* pairs
    }

    const map = await toMap(values())

    t.true(map instanceof Map)

    t.is(map.size, 3)
    t.is(map.get(1), 2)
    t.is(map.get(3), 4)
    t.is(map.get(4), 5)

    t.true(pairs.every(pair => !pair.extra))
})

test("toMap overrides early values with later values of the same key", async t => {
    const pair = (value1, value2) => ({
        * [Symbol.iterator]() {
            yield value1
            yield value2
            this.extra = true
        },
    })

    const pairs = [pair(1, 2), pair(3, 4), pair(4, 5), pair(1, 3), pair(1, 7), pair(2, 1)]

    async function* values() {
        yield* pairs
    }

    const map = await toMap(values())
    t.is(map.get(1), 7)
    t.is(map.get(2), 1)

    t.true(pairs.every(pair => !pair.extra))
})

test("toMap throws an error if any pairs are not iterable", async t => {
    const data = [1, 2, 3, 4]

    await t.throws(toMap(data))
})

test("toMap throws early on invalid arguments", t => {
    const data = [[1, 2], [2, 3], [4, 5]]
    t.throws(_ => toMap())
    t.throws(_ => toMap(data, []))
    t.throws(_ => toMap(...data))
})
