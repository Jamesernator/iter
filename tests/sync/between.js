import test from "ava"
import between from "../../src/sync/between.js"
import array from "../../src/sync/array.js"

test('between basic behaviour', t => {
    const seq = [1,2,3,4,5,6,7,8,9,10]
    t.deepEqual(
        seq::between(3, 8)::array(),
        [4,5,6,7,8]
    )
})

test("between throws if sequence doesn't reach endpoint", t => {
    const seq = [1,2,3,4,5]
    try {
        seq::between(3, 8)::array()
        t.fail()
    } catch (_) {
        t.pass()
    }
})

test("between throws if sequence doesn't reach startpoint", t => {
    const seq = []
    try {
        seq::between(3, 8)::array()
        t.fail()
    } catch (_) {
        t.pass()
    }
})

test("between doesn't throw if enforceLength is false", t => {
    const seq = []
    const seq2 = [1,2,3,4,5]
    try {
        seq::between(3, 8, false)::array()
        t.pass()
    } catch (_) {
        t.fail()
    }

    try {
        seq2::between(3, 8, false)::array()
        t.pass()
    } catch (_) {
        t.fail()
    }
})

test("between throws early on bad args", t => {
    t.throws(_ => {
        []::between(0, 'banana')
    })

    t.throws(_ => {
        []::between(0, 3, 'banana')
    })

    t.throws(_ => {
        []::between(0, 0, 0, 0)
    })

    t.throws(_ => {
        []::between(-1, NaN)
    })
})
