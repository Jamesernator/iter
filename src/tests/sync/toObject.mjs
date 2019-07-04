import test from "ava"
import toObject from "../../sync/toObject.mjs"

test("toObject converts a sequence of arrays into a object", t => {
    const pairs = [[1, 2, 12], [3, 4], [4, 5]]

    function* values() {
        yield* pairs
    }

    const obj = toObject(values())
    t.is(null, Object.getPrototypeOf(obj))
    t.deepEqual(obj, { 1: 2, 3: 4, 4: 5 })
    t.true(pairs.every(pair => !pair.extra))
})

test("toObject overrides early values with later values of the same key", t => {
    const pairs = [[1, 2], [3, 4, 16], [4, 5], [1, 3], [1, 7, 12], [2, 1]]

    function* values() {
        yield* pairs
    }

    const obj = toObject(values())
    t.deepEqual(obj, { 1: 7, 3: 4, 4: 5, 2: 1 })

    t.true(pairs.every(pair => !pair.extra))
})

test("toObject throws an error if any pairs are not iterable", t => {
    const data = [1, 2, 3, [1, 3]]

    t.throws(_ => toObject(data))
})

test("toObject can accept a custom prototype", t => {
    const data = [['foo', 'bar'], ['bar', 'baz']]

    const customProto = { z: 20 }
    const obj = toObject(data, customProto)

    t.is(customProto, Object.getPrototypeOf(obj))
    t.is(obj.z, 20)
    t.is(obj.foo, 'bar')
})

test("toObject throws early on invalid arguments", t => {
    const data = [[1, 2], [2, 3], [4, 5]]
    t.throws(_ => toObject())
    t.throws(_ => toObject(...data))
    t.throws(_ => toObject(data, {}, 'bar'))
})

test("toObject ignores getters/setters when assigning values", t => {
    const data = [[1, 2], [3, 4]]

    const proto = {
        get 1() {
            throw new Error("Ooops!")
        },

        get 2() {
            throw new Error("Ooops!")
        },
    }

    t.deepEqual({ 1: 2, 3: 4 }, toObject(data, proto))
})
