import test from "ava"
import createMethod from "../../src/sync/createMethod.js"

test('createMethod creates a function with an extended iterator as this', t => {
    const method = createMethod(function foo() {
        return this.next()
    })
    t.deepEqual(
        [1]::method(),
        {
            done: false,
            value: 1
        }
    )

    const method2 = createMethod(function bar() {
        return this
    })

    const target = [1,2,3]
    t.is(
        target::method2().target,
        target
    )
})
