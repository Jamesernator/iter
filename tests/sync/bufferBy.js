import test from "ava"
import bufferBy from "../../src/sync/bufferBy.js"
import array from "../../src/sync/array.js"
import final from "../../src/sync/final.js"

test('bufferBy basic functionality', t => {
    t.deepEqual(
        [1,1,2,3,3,4,4,5,6,7,8]::bufferBy(item => item % 3 === 0)::array(),
        [[1,1,2,3], [3], [4,4,5,6], [7,8]]
    )
})

test('bufferBy recieves correct args', t => {
    t.deepEqual(
        [1,1,2,0,3,2,'a',NaN,3,'a']::bufferBy((item, buff) => {
            return buff.length > 1 && buff[0] === item
        })::array(),
        [[1,1], [2,0,3,2],['a', NaN, 3, 'a']]
    )
})

test('bufferBy ignore rest', t => {
    t.deepEqual(
        [1,1,2,3,3,4,4,5,6,7,8]
            ::bufferBy(item => item % 3 === 0, true)::array(),
        [[1,1,2,3], [3], [4,4,5,6]]
    )
})

test('bufferBy defaults to truthy predicate', t => {
    t.deepEqual(
        [0, '', 1, undefined, null, {}, NaN, false, []]::bufferBy()::array(),
        [[0, '', 1], [undefined, null, {}], [NaN, false, []]]
    )
})

test('bufferBy preserves completion value', t => {
    const seq = function*() {
        yield 1
        yield 2
        yield 3
        return 'hello'
    }

    t.is(
        seq()::bufferBy(x => x % 2 ===0)::final(),
        'hello'
    )
})

test('bufferBy throws on bad arguments', t => {
    t.throws(_ => {
        []::bufferBy(1)
    })

    t.throws(_ => {
        []::bufferBy(x => x, 4)
    })

    t.throws(_ => {
        []::bufferBy(x => x, true, 'banana')
    })
})
