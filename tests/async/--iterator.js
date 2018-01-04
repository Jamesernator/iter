import test from "ava"
import iterator from "../../async/--iterator.mjs"

test("iterator returns an iterator for a given iterable", async t => {
    const iter = iterator([1, 2])

    t.is('function', typeof iter.next)
    t.deepEqual(await iter.next(), { done: false, value: 1 })
    t.deepEqual(await iter.next(), { done: false, value: 2 })
    t.deepEqual(await iter.next(), { done: true, value: undefined })
})

test.failing("iterator reuses the initial value of nextMethod", async t => {
    const iter = iterator({
        [Symbol.asyncIterator]() {
            return {
                next() {
                    this.next = function() {
                        return { value: 2, done: false }
                    }
                    return { value: 1, done: false }
                },
            }
        },
    })

    t.deepEqual(await iter.next(), { done: false, value: 1 })
    t.deepEqual(await iter.next(), { done: false, value: 1 })
})

import countClosing from "./helpers/countClosing.mjs"

test("calling return is idempotent when the sequence is already closed", async t => {
    const data = countClosing([1, 2, 3, 4, 5])
    const seq = iterator(data)

    await seq.next()
    await seq.next()
    t.is(data.closed, 0)
    await seq.return()
    t.is(data.closed, 1)
    await seq.return()
    t.is(data.closed, 1)
})
