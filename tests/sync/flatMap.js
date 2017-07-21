import test from "ava"
import flatMap from "../../src/sync/flatMap.js"
import array from "../../src/sync/array.js"
import final from "../../src/sync/final.js"

test('flatMap basic functionality', t => {
    const data = [1,2,3,4]
    console.log(data::flatMap(x => [x,x])::array())
    t.deepEqual(
        data::flatMap(x => [x, x])::array(),
        [1,1,2,2,3,3,4,4]
    )
    t.deepEqual(
        data::flatMap(x => [[x,x]])::array(),
        [[1,1], [2,2], [3,3], [4,4]]
    )
})

test('flatMap with depth', t => {
    const data = [1,2,3,4]
    t.deepEqual(
        data::flatMap(2, x => [[x,x]])::array(),
        [1,1,2,2,3,3,4,4]
    )
})

test('flatMap with predicate', t => {
    const data = [1,2,3,4]
    t.deepEqual(
        data::flatMap((_, idx) => idx % 2 === 0, x => [x, x])::array(),
        [1,1, [2,2], 3, 3, [4,4]]
    )
})

test('flatMap with depth and predicate', t => {
    const data = [1,2,3,4]
    t.deepEqual(
        data::flatMap(2, (_, idx) => idx % 2 === 0, x => [[x, x]])::array(),
        [1,1, [[2,2]], 3,3, [[4,4]]]
    )
})

test('flatMap preserves return value', t => {
    const seq = function*() {
        yield 1
        yield 2
        yield 3
        return 'hello'
    }
    t.is(
        seq()::flatMap(x => [x,x])::final(),
        'hello'
    )
})

test('flatMap throws early on bad arguments', t => {
    t.throws(_ => {
        []::flatMap('banana')
    })

    t.throws(_ => {
        []::flatMap(2, 'fishBiscuit')
    })

    t.throws(_ => {
        []::flatMap('foo', x => x)
    })

    t.throws(_ => {
        []::flatMap(-3, x => x**2)
    })

    t.throws(_ => {
        []::flatMap(null, x => x)
    })
})
