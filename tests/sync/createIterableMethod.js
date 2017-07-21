import test from "ava"
import createIterableMethod from "../../src/sync/createIterableMethod.js"

test('createIterableMethod creates an iterable', t => {
    const unwrappedMethod = function*() { /* */ }
    const iterable = createIterableMethod(unwrappedMethod)()
    t.true(
        iterable[Symbol.iterator] instanceof Function
    )

    t.is(
        iterable.type,
        'sync'
    )
})
