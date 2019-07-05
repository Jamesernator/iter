import test from "ava"
import reverse from "../../async/reverse.js"
import toArray from "../../async/toArray.js"

test("reverse basic functionality", async t => {
    const data = [1, 2, 3, 4]

    t.deepEqual(
        await toArray(reverse(data)),
        [4, 3, 2, 1],
    )

    t.deepEqual(
        await toArray(reverse([])),
        [],
    )

    t.deepEqual(
        await toArray(reverse('cats')),
        ['s', 't', 'a', 'c'],
    )
})

test("reverse throws early on invalid arguments", t => {
    t.throws(_ => reverse())
    t.throws(_ => reverse(12))
    t.throws(_ => reverse([], 'banana'))
})
