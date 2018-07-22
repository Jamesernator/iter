import test from "ava"
import iterator from "../../sync/--iterator.mjs"

test("iterator returns an iterator for a given iterable", t => {
    const iter = iterator([1, 2])

    t.is('function', typeof iter.next)
    t.deepEqual(iter.next(), { done: false, value: 1 })
    t.deepEqual(iter.next(), { done: false, value: 2 })
    t.deepEqual(iter.next(), { done: true, value: undefined })
})

test("iterator reuses the initial value of nextMethod", t => {
    const iter = iterator({
        [Symbol.iterator]() {
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

    t.deepEqual(iter.next(), { done: false, value: 1 })
    t.deepEqual(iter.next(), { done: false, value: 1 })
})

import countClosing from "./helpers/countClosing.mjs"


test("calling return is idempotent when the sequence is already closed", t => {
    const data = countClosing([1, 2, 3, 4, 5])
    const seq = iterator(data)

    seq.next()
    seq.next()
    t.is(data.closed, 0)
    seq.return()
    t.is(data.closed, 1)
    seq.return()
    t.is(data.closed, 1)
})
