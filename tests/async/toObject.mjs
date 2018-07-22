import test from "ava"
import toObject from "../../async/toObject.mjs"

test("toObject converts a sequence of iterables into a object", async t => {
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

    const obj = await toObject(values())
    t.is(null, Object.getPrototypeOf(obj))
    t.deepEqual(obj, { 1: 2, 3: 4, 4: 5 })
    t.true(pairs.every(pair => !pair.extra))
})

test("toObject overrides early values with later values of the same key", async t => {
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

    const obj = await toObject(values())
    t.deepEqual(obj, { 1: 7, 3: 4, 4: 5, 2: 1 })

    t.true(pairs.every(pair => !pair.extra))
})

test("toObject throws an error if any pairs are not iterable", async t => {
    const data = [1, 2, 3, [1, 3]]

    await t.throws(toObject(data))
})

test("toObject can accept a custom prototype", async t => {
    const data = [['foo', 'bar'], ['bar', 'baz']]

    const customProto = { z: 20 }
    const obj = await toObject(data, customProto)

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

import countClosing from "./helpers/countClosing.mjs"

test("toObject iterator closing on setter error", async t => {
    const data = countClosing([[1, 2], [3, 4]])

    await t.throws(toObject(data, {
        get 1() {
            throw new Error("Error")
        },

        set 1(_) {
            throw new Error("Error")
        },
    }))
    t.is(data.closed, 1)
})
