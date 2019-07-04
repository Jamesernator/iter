import test from "ava"
import replaceError from "../../sync/replaceError.mjs"
import toArray from "../../sync/toArray.mjs"

test("replaceError can replace an error with another sequence", t => {
    function* seq() {
        yield 1
        yield 2
        throw new Error("Whoops")
    }

    t.deepEqual(
        toArray(replaceError(seq(), _ => [3, 4])),
        [1, 2, 3, 4],
    )
})

test("replaceError will throw an error from the second sequence", t => {
    function* seq1() {
        yield 1
        yield 2
        throw new Error("Whoops")
    }

    function* seq2() {
        yield 3
        throw new Error("Oops")
        // eslint-disable-next-line no-unreachable
        yield 4
    }

    const seen = []
    t.throws(_ => {
        for (const item of replaceError(seq1(), _ => seq2())) {
            seen.push(item)
        }
    })

    t.deepEqual(
        seen,
        [1, 2, 3],
    )
})

test("replaceError throws early on invalid arguments", t => {
    t.throws(_ => replaceError())
    t.throws(_ => replaceError(12))
    t.throws(_ => replaceError([1, 2], [3, 4]))
    t.throws(_ => replaceError([], _ => [3, 4], 'banana'))
})

import countClosing from "./helpers/countClosing.mjs"

test("replaceError iterator closing early", t => {
    let closed = 0
    function* seq() {
        try {
            yield 1
            yield 2
        } finally {
            closed += 1
        }
        closed -= 1
        throw new Error("Foo")
    }

    const data = countClosing([1, 2, 3])

    const s = replaceError(seq(), _ => data)[Symbol.iterator]()
    s.next()
    s.return()
    t.is(closed, 1)

    const s2 = replaceError(seq(), _ => data)[Symbol.iterator]()
    s2.next()
    s2.next()
    s2.next()
    s2.return()
    t.is(closed, 1)
    t.is(data.closed, 1)
})
