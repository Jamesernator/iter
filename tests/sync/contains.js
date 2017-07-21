import test from "ava"
import contains from "../../src/sync/contains.js"

test("contains default ===", t => {
    t.true(
        [1,2,3,4]::contains(2)
    )
    const x = {}
    t.true(
        [x, {}, NaN]::contains(x)
    )

    t.true(
        [-0, 4]::contains(0)
    )
    t.false(
        [3, NaN, 'banana']::contains(NaN)
    )
})

test("contains ===", t => {
    t.true(
        [1,2,3,4]::contains(2, '===')
    )
    const x = {}
    t.true(
        [x, {}, NaN]::contains(x, '===')
    )

    t.true(
        [-0, 4]::contains(0, '===')
    )
    t.false(
        [3, NaN, 'banana']::contains(NaN, '===')
    )
})

test("contains ==", t => {
    t.true(
        [1,'2', 3]::contains(2, '==')
    )

    t.true(
        [1, '', 0]::contains(false, '==')
    )

    t.true(
        // eslint-disable-next-line no-sparse-arrays
        [2,,,,,]::contains(null, '==')
    )

    t.false(
        []::contains(null)
    )
})

test("contains SameValueZero", t => {
    t.true(
        [4, 'banana', -0, {}]::contains(0, 'SameValueZero')
    )

    t.true(
        [4, 'banana', 0, {}]::contains(-0, 'SameValueZero')
    )

    t.true(
        [4, 'banana', NaN, {}]::contains(NaN, 'SameValueZero')
    )
})

test("contains SameValue", t => {
    t.false(
        [4, 'banana', -0, {}]::contains(0, 'SameValue')
    )

    t.false(
        [4, 'banana', 0, {}]::contains(-0, 'SameValue')
    )

    t.true(
        [4, 'banana', NaN, {}]::contains(NaN, 'SameValue')
    )
})

test("contains throws early on bad arguments", t => {
    t.throws(_ => {
        []::contains(0, 'fishBiscuit')
    })

    t.throws(_ => {
        []::contains(0, null)
    })

    t.throws(_ => {
        []::contains(0, {})
    })
})
