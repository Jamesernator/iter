import test from "ava"
import createOperator from "../../async/createOperator.mjs"

test('createOperator creates a function which expects an iterable', async t => {
    const method = createOperator(function foo(iterable) {
        return iterable
    })

    const seq1 = async function* seq() {
        yield 1
        yield 2
        yield 3
    }

    t.true(typeof method(seq1())[Symbol.asyncIterator] === 'function')

    const sequence = [1, 2, 3, 4]
    t.true(typeof method(sequence)[Symbol.iterator] === 'function')

    const method2 = createOperator(async function bar(iterable) {
        const array = []
        for await (const item of iterable) {
            array.push(item)
        }
        return array
    })

    t.deepEqual([12, 11, 13], await method2([12, 11, 13]))
})

test('createOperator forwards additional arguments', async t => {
    const nth = createOperator(async function nth(iterable, n) {
        let i = 0
        for await (const item of iterable) {
            if (i === n) {
                return item
            }
            i += 1
        }
        throw new Error("No such value")
    })

    const sequence = [1, 2, 3, 4]
    t.is(3, await nth(sequence, 2))
    await t.throwsAsync(nth(sequence, 11))
})

test('createOperator preserves the original function name', t => {
    const methodName = createOperator(async function methodName() {
        /* Test function */
    })
    t.is(methodName.name, 'methodName')
})

test("createOperator created method throws an error if value isn't iterable", t => {
    const method = createOperator(async function method(iterable) {
        return iterable
    })

    t.throws(_ => method())
    t.throws(_ => method(12))
    t.throws(_ => method({}))
    t.throws(_ => method(new Date()))
})
