import test from "ava"
import followWith from "../../src/sync/followWith.js"
import array from "../../src/sync/array.js"
import final from "../../src/sync/final.js"

test('followWith basic functionality', t => {
    t.deepEqual(
        [1,2,3]::followWith([4,5,6])::array(),
        [1,2,3,4,5,6]
    )
})

test('followWith multiple sequences', t => {
    const seq = function*() {
        yield 7
        yield 8
        yield 9
        return 'hello'
    }
    t.deepEqual(
        [1,2,3,4]::followWith([5,6], seq())::array(),
        [1,2,3,4,5,6,7,8,9]
    )
})

test('followWith preserves final value', t => {
    const seq = function*() {
        yield 7
        yield 8
        yield 9
        return 'hello'
    }
    t.is(
        [1,2,3]::followWith([5,6], seq())::final(),
        'hello'
    )
})

test('followWith throws early on bad arguments', t => {
    t.throws(_ => {
        [1,2,3]::followWith(2, [3,4,3])::array()
    })

    t.throws(_ => {
        [1,2,3]::followWith({ [Symbol.iterator]: 2 }, [2,2])
    })
})
