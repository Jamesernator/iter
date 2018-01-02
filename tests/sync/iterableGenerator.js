import test from "ava"
import iterableGenerator from "../../sync/iterableGenerator.mjs"
import snapshotIterable from "../../sync/--snapshotIterable.mjs"
import toArray from "../../sync/toArray.mjs"

test('iterableGenerator returns an object that be iterated', t => {
    const gen = function* () {
        yield 1
        yield 2
        yield 3
    }

    const iterableGen = iterableGenerator(gen)

    t.is('function', typeof iterableGen)

    const iterable = iterableGen()

    t.truthy(snapshotIterable(iterable))

    t.deepEqual(
        toArray(iterable),
        [1, 2, 3],
    )
})

test('iterableGenerator function returns an object that can be reiterated', t => {
    let count = 0
    const gen = function* () {
        count += 1
        yield 1
        yield 2
        yield 3
    }

    const iterableGen = iterableGenerator(gen)
    const iterable = iterableGen()

    t.deepEqual(
        toArray(iterable),
        [1, 2, 3],
    )

    t.is(count, 1)

    t.deepEqual(
        toArray(iterable),
        [1, 2, 3],
    )

    t.is(count, 2)
})

test('iterableGenerator has arguments forwarded to created iterator', t => {
    const gen = function* (start) {
        for (let i = start; i < start + 3; i += 1) {
            yield i
        }
    }

    const iterableGen = iterableGenerator(gen)
    const iterable = iterableGen(11)

    t.deepEqual(
        toArray(iterable),
        [11, 12, 13],
    )

    // Iterable can be re-used with the same arguments

    t.deepEqual(
        toArray(iterable),
        [11, 12, 13],
    )

    const iterable2 = iterableGen(14)

    t.deepEqual(
        toArray(iterable2),
        [14, 15, 16],
    )
})

test('iterableGenerator throws early on invalid arguments', t => {
    t.throws(_ => iterableGenerator('foo'))
    t.throws(_ => iterableGenerator())
    // eslint-disable-next-line no-empty-function
    t.throws(_ => iterableGenerator(function* foo() {}, 12))
})
