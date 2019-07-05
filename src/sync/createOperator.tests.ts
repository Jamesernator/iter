import test from "ava"
import createOperator from "../../sync/createOperator.js"

test('createOperator creates a function which expects an iterable', t => {
    const method = createOperator(function foo(iterable) {
        return iterable
    })

    const sequence = [1, 2, 3, 4]
    t.true(typeof method(sequence)[Symbol.iterator] === 'function')

    const method2 = createOperator(function bar(iterable) {
        return Array.from(iterable)[0]
    })

    t.is(12, method2([12, 11, 13]))
})

test('createOperator forwards additional arguments', t => {
    const nth = createOperator(function nth(iterable, n) {
        return Array.from(iterable)[n]
    })

    const sequence = [1, 2, 3, 4]
    t.is(3, nth(sequence, 2))
})

test('createOperator preserves the original function name', t => {
    const methodName = createOperator(function methodName() {
        /* Test function */
    })
    t.is(methodName.name, 'methodName')
})

test("createOperator created method throws an error if value isn't iterable", t => {
    const method = createOperator(function method(iterable) {
        return iterable
    })

    t.throws(_ => method(12))
    t.throws(_ => method())
    t.throws(_ => method({}))
    t.throws(_ => method(new Date()))
})
