import test from "ava"
import extendedIterator from "../../src/sync/extendedIterator.js"


test('extendedIterator basic behaviour', t => {
    const seq = function*() {
        yield 1
        yield 2
        return "hello"
    }

    const target = seq()
    const iter = extendedIterator(target)

    t.is(
        iter.target,
        target
    )

    t.false(iter.done)
    t.is(iter.final, undefined)

    t.deepEqual(
        iter.next(),
        {
            done: false,
            value: 1
        }
    )

    t.false(iter.done)
    t.is(iter.final, undefined)

    t.deepEqual(
        iter.next(),
        {
            done: false,
            value: 2
        }
    )

    t.false(iter.done)
    t.is(iter.final, undefined)

    t.deepEqual(
        iter.next(),
        {
            done: true,
            value: 'hello'
        }
    )

    t.true(iter.done)
    t.is(iter.final, 'hello')

    t.deepEqual(
        iter.next(),
        {
            done: true,
            value: undefined
        }
    )

    t.true(iter.done)
    t.is(iter.final, 'hello')
})

test('extendedIterator correctly proxies throw', t => {
    const seq = function*() {
        try {
            yield 1
        } catch (e) {
            yield 2
        }
    }

    const target = seq()
    const iter = extendedIterator(target)

    t.deepEqual(
        iter.next(),
        {
            value: 1,
            done: false
        }
    )

    t.deepEqual(
        iter.throw(),
        {
            value: 2,
            done: false
        }
    )

    try {
        iter.throw('Err')
        t.fail("extendedIterator should have thrown")
    } catch (e) {
        t.is(e, 'Err')
    }

    t.deepEqual(
        iter.next(),
        {
            done: true,
            value: undefined
        }
    )
})

test('extendedIterator correctly proxies return', t => {
    const seq = function*() {
        yield 1
    }

    const target = seq()
    const iter = extendedIterator(target)

    t.deepEqual(
        iter.next(),
        {
            done: false,
            value: 1
        }
    )

    t.deepEqual(
        iter.return(10),
        {
            done: true,
            value: 10
        }
    )
})

test('extendedIterator proxies return when value isn\'t done', t => {
    const seq = function*() {
        try {
            yield 1
        } finally {
            yield 2
        }
    }

    const iter = extendedIterator(seq())
    iter.next()
    t.deepEqual(
        iter.return(5),
        {
            done: false,
            value: 2
        }
    )

    t.is(iter.done, false)
    t.is(iter.final, undefined)
})

test.skip('extendedIterator proxies return when value is overriden', t => {
    const seq = function*() {
        try {
            yield 1
        } finally {
            /* eslint-disable no-unsafe-finally */
            return 3
            /* eslint-enable no-unsafe-finally */
        }
    }

    const iter = extendedIterator(seq())

    t.deepEqual(
        iter.next(),
        {
            done: false,
            value: 1
        }
    )

    t.deepEqual(
        iter.return(5),
        {
            done: true,
            value: 3
        },
        'ensure overriden values still work'
    )
    t.is(iter.done, true)
    t.is(iter.final, 3)
})
