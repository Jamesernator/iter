import test from "ava"
import scan from "../../async/scan.js"
import toArray from "../../async/toArray.js"

test("scan acts like reduce but emits the intermediate stages", async t => {
    const data = [1, 2, 3, 4, 5]

    t.deepEqual(
        await toArray(scan(data, (acc, val) => acc + val**2)),
        [1, 5, 14, 30, 55],
    )
})

test('scan without arguments joins sequence using +', async t => {
    const target = ['Cat', 'Hat', 'Bat']
    t.deepEqual(
        await toArray(scan(target)),
        ['Cat', 'CatHat', 'CatHatBat'],
    )
})

test("scan throws an error if sequence is empty", async t => {
    const target = []
    await t.throwsAsync(toArray(scan(target)))
    await t.throwsAsync(scan(target)[Symbol.asyncIterator]().next())
})

test("scan can accept an initial value to seed the sequence", async t => {
    const data = ['Cat', 'Hat', 'Bat']
    t.deepEqual(
        await toArray(scan(data, 'Mat', (acc, item) => acc + item)),
        ['Mat', 'MatCat', 'MatCatHat', 'MatCatHatBat'],
    )
})

test("scan doesn't throw an error on empty sequence when given initial value", async t => {
    const data = []
    t.deepEqual(
        await toArray(scan(data, 'Fizzbuzz', _ => { throw new Error("Not reached!") })),
        ['Fizzbuzz'],
    )
})

test("scan throws early on invalid arguments", t => {
    const data = [1, 2, 3, 4]
    t.throws(_ => scan())
    t.throws(_ => scan(data, 'fizzbuzz'))
    t.throws(_ => scan(data, {}, 'banana'))
    t.throws(_ => scan(data, {}, _ => _, 'extra'))
})

import CountClosing from "./helpers/CountClosing.js"

test("scan iterator closing on early end", async t => {
    const data = CountClosing([1, 2, 3, 4])
    const seq = scan(data)[Symbol.asyncIterator]()

    await seq.next()
    await seq.return()
    t.is(data.closed, 1)
})

test("scan iterator closing on reducer error", async t => {
    const data = CountClosing([1, 2, 3, 4])
    const seq = scan(data, _ => { throw new Error("Error") })

    await t.throwsAsync(toArray(seq))
    t.is(data.closed, 1)
})
