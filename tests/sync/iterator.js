import test from "ava"
import iterator from "../../sync/iterator.mjs"

test("iterator returns an iterator for a given iterable", t => {
    const iter = iterator([1, 2])

    t.is('function', typeof iter.next)
    t.deepEqual(iter.next(), { done: false, value: 1 })
    t.deepEqual(iter.next(), { done: false, value: 2 })
    t.deepEqual(iter.next(), { done: true, value: undefined })
})

test("iterator can use throw/return if the given iterable's iterator provides those", t => {
    const iter = iterator({
        [Symbol.iterator]() {
            return {
                next() {
                    return { done: true, value: undefined }
                },

                throw(err) {
                    return { done: false, value: err }
                },

                return(val) {
                    return { done: false, value: val }
                },
            }
        },
    })

    t.deepEqual(iter.throw('banana'), { done: false, value: 'banana' })
    t.deepEqual(iter.return('fizzbuzz'), { done: false, value: 'fizzbuzz' })

    const iter2 = iterator({
        [Symbol.iterator]() {
            return {
                throw(err) {
                    throw err
                },

                return(val) {
                    throw val
                },
            }
        },
    })

    t.throws(_ => iter2.return(12), e => e === 12)
    t.throws(_ => iter2.throw(13), e => e === 13)
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

test("iterator returned is frozen", t => {
    const iter = iterator('foobar')

    t.true(Object.isFrozen(iter))
})

test("iterator throws early on invalid arguments", t => {
    t.throws(_ => iterator(12))
    t.throws(_ => iterator())
    t.throws(_ => iterator([1, 2, 3], 'banana'))
})
