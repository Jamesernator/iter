import test from "ava"
import equality from "../../src/helps/equalityComparisons"

test("equality ===", t => {
    const isEqual = equality('===')
    t.true(isEqual(1, 1))
    t.true(isEqual('banana', 'banana'))
    const x = { y: 10 }
    t.true(isEqual(x, x))
    t.false(isEqual({}, {}))
    t.false(isEqual(NaN, NaN))
    t.false(isEqual(undefined, undefined))
})

test("equality default is same as ===", t => {
    t.is(equality().toString(), equality('===').toString())
})

test("equality ==", t => {
    const isEqual = equality('==')
    t.true(isEqual(1, 1))
    t.true(isEqual(1, '1'))
    t.true(isEqual(undefined, null))
    t.true(isEqual(null, 0))
    t.true(isEqual(0, ''))
    t.false(isEqual({}, {}))
})

test("equality sameValueZero", t => {
    const isEqual = equality('sameValueZero')
    t.true(isEqual('cat', 'cat'))
    t.true(isEqual(NaN, NaN))
    t.true(isEqual(0, -0))
    t.false(isEqual('', 0))
})

test("equality sameValue", t => {
    const isEqual = equality('sameValue')
    t.true(isEqual('cat', 'cat'))
    t.true(isEqual(NaN, NaN))
    t.false(isEqual(0, -0))
})
