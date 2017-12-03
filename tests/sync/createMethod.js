import test from "ava"
import createMethod from "../../sync/createMethod.mjs"

test('createMethod creates a function which expects an iterable', t => {
    const method = createMethod(function foo(iterable) {
        return iterable
    })

    const sequence = [1, 2, 3, 4]
    t.is(sequence, method(sequence))

    const method2 = createMethod(function bar(iterable) {
        return Array.from(iterable)[0]
    })

    t.is(12, method2([12, 11, 13]))
})

test('createMethod can use this value as iterable instead', t => {
    const method = createMethod(function foo(iterable) {
        return iterable
    })

    const sequence = [1, 2, 3, 4]
    t.is(sequence, Reflect.apply(method, sequence, []))

    const method2 = createMethod(function bar(iterable) {
        return Array.from(iterable)[0]
    })
    t.is(12, Reflect.apply(method2, [12, 11, 13], []))
})

test('createMethod forwards additional arguments', t => {
    const nth = createMethod(function nth(iterable, n) {
        return Array.from(iterable)[n]
    })

    const sequence = [1, 2, 3, 4]
    t.is(3, nth(sequence, 2))
})

test('createMethod forwards additional arguments with this application', t => {
    const nth = createMethod(function nth(iterable, n) {
        return Array.from(iterable)[n]
    })

    const sequence = [1, 2, 3, 4]
    t.is(3, Reflect.apply(nth, sequence, [2]))
})

test('createMethod preserves the original function name', t => {
    const methodName = createMethod(function methodName() {
        /* Test function */
    })
    t.is(methodName.name, 'methodName')
})

test("createMethod created method throws an error if value isn't iterable", t => {
    const method = createMethod(function method(iterable) {
        return iterable
    })

    t.throws(_ => method(12))
    t.throws(_ => method())
    t.throws(_ => method({}))
    t.throws(_ => method(new Date()))
})
