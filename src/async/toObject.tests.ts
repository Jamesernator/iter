import test from "ava"
import toObject from "../../async/toObject.mjs"

test("toObject converts a sequence of arrays into a object", async t => {
    const pairs = [[1, 2, 12], [3, 4], [4, 5]]

    async function* values() {
        yield* pairs
    }

    const obj = await toObject(values())
    t.is(null, Object.getPrototypeOf(obj))
    t.deepEqual(obj, { 1: 2, 3: 4, 4: 5 })
    t.true(pairs.every(pair => !pair.extra))
})

test("toObject overrides early values with later values of the same key", async t => {
    const pairs = [[1, 2], [3, 4, 16], [4, 5], [1, 3], [1, 7, 12], [2, 1]]

    async function* values() {
        yield* pairs
    }

    const obj = await toObject(values())
    t.deepEqual(obj, { 1: 7, 3: 4, 4: 5, 2: 1 })

    t.true(pairs.every(pair => !pair.extra))
})

test("toObject throws an error if any pairs are not iterable", async t => {
    const data = [1, 2, 3, [1, 3]]

    await t.throwsAsync(toObject(data))
})

test("toObject throws early on invalid arguments", t => {
    const data = [[1, 2], [2, 3], [4, 5]]
    t.throws(_ => toObject())
    t.throws(_ => toObject(...data))
    t.throws(_ => toObject(data, {}, 'bar'))
})

test("toObject ignores getters/setters when assigning values", async t => {
    const data = [[1, 2], [3, 4]]

    const proto = {
        get 1() {
            throw new Error("Ooops!")
        },

        get 2() {
            throw new Error("Ooops!")
        },
    }

    t.deepEqual({ 1: 2, 3: 4 }, await toObject(data, proto))
})
