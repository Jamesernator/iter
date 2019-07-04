import test from "ava"
import sample from "../../async/sample.mjs"

test("sample with no additional argument returns a number", async t => {
    const data = [1, 2, 3, 4, 5, 6]
    const choice = await sample(data)
    t.is(typeof choice, 'number')
    t.true(data.includes(choice))
})

test("sample with single numeric argument returns a sampling of size n", async t => {
    const data = [1, 2, 3, 4, 5]
    const choice = await sample(data, 3)
    t.true(Array.isArray(choice))
    t.is(choice.length, 3)
    for (const element of choice) {
        t.true(data.includes(element))
    }
    t.true(choice.length === new Set(choice).size)
})

test("sample with a single numeric arguments throws an error on too short sequence", async t => {
    const data = [1, 2, 3]
    await t.throwsAsync(sample(data, 5))
})

test("sample with numeric argument and boolean true doesn't throw", async t => {
    const data = [1, 2, 3]
    t.deepEqual([1, 2, 3], await sample(data, 10, true))
})

test("sample throws on invalid arguments", async t => {
    const data = [1, 2, 3, 4]
    t.throws(_ => sample())
    t.throws(_ => sample(data, 'fizzbuzz'))
    t.throws(_ => sample(data, [1, 2, 3, 4]))
    t.throws(_ => sample(data, 3, true, 'banana'))

    await t.notThrows(_ => sample(data, 'single'))
})
