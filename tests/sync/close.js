import test from "ava"
import close from "../../src/sync/close.js"

test("close", t => {
    const seq = function*() {
        yield 1
        try {
            yield 2
        } finally {
            return "Goodbye"
        }
    }()

    seq.next()
    seq::close()
})

test("close throws when seq doesn't terminate", t => {
    const seq = function*() {
        try {
            yield 1
        } finally {
            yield 2
        }
    }()

    seq.next()
    try {
        seq::close()
        t.fail()
    } catch (e) {
        t.pass()
    }
})
