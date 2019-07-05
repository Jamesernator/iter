import test from "ava"
import sample from "../../sync/sample.js"

test("sample with no additional argument returns a number", t => {
    const data = [1, 2, 3, 4, 5, 6]
    const choice = sample(data)
    t.is(typeof choice, 'number')
    t.true(data.includes(choice))
})

test("sample with single numeric argument returns a sampling of size n", t => {
    const data = [1, 2, 3, 4, 5]
    const choice = sample(data, 3)
    t.true(Array.isArray(choice))
    t.is(choice.length, 3)
    for (const element of choice) {
        t.true(data.includes(element))
    }
    t.true(choice.length === new Set(choice).size)
})

test("sample with a single numeric arguments throws an error on too short sequence", t => {
    const data = [1, 2, 3]
    t.throws(_ => sample(data, 5))
})

test("sample with numeric argument and boolean true doesn't throw", t => {
    const data = [1, 2, 3]
    t.deepEqual([1, 2, 3], sample(data, 10, true))
})

test("sample throws on invalid arguments", t => {
    const data = [1, 2, 3, 4]
    t.throws(_ => sample())
    t.throws(_ => sample(data, 'fizzbuzz'))
    t.throws(_ => sample(data, [1, 2, 3, 4]))
    t.throws(_ => sample(data, 3, true, 'banana'))

    t.notThrows(_ => sample(data, 'single'))
})
