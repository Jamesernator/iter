import test from "ava"
import map from "../../src/sync/map.js"
import final from "../../src/sync/final.js"
import array from "../../src/sync/array.js"

test('map', t => {
    const target = [1,2,3]
    t.deepEqual(
        target::map((item, idx, _target) => [item**2, idx, _target])::array(),
        [
            [1, 0, target],
            [4, 1, target],
            [9, 2, target]
        ]
    )
})

test('map without argument returns equivalent sequence', t => {
    const target = [{}, 1, []]
    t.deepEqual(
        target::map()::array(),
        target
    )
})

test('map preserves done value', t => {
    const seq = function*() {
        yield 1
        yield 2
        yield 3
        return "Hello"
    }

    t.is(
        seq()::final(),
        "Hello"
    )
})
