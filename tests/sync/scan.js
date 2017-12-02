import test from "ava"
import scan from "../../src/sync/scan.mjs"
import toArray from "../../src/sync/toArray.mjs"

test("scan acts like reduce but emits the intermediate stages", t => {
    const data = [1, 2, 3, 4, 5]

    t.deepEqual(
        toArray(scan(data, (acc, val) => acc + val**2)),
        [1, 5, 14, 30, 55],
    )
})

test('scan without arguments joins sequence using +', t => {
    const target = ['Cat', 'Hat', 'Bat']
    t.deepEqual(
        toArray(scan(target)),
        ['Cat', 'CatHat', 'CatHatBat'],
    )
})

test("scan throws an error if sequence is empty", t => {
    const target = []
    t.throws(_ => toArray(scan(target)))
    t.throws(_ => scan(target)[Symbol.iterator]().next())
})

test("scan can accept an initial value to seed the sequence", t => {
    const data = ['Cat', 'Hat', 'Bat']
    t.deepEqual(
        toArray(scan(data, 'Mat', (acc, item) => acc + item)),
        ['Mat', 'MatCat', 'MatCatHat', 'MatCatHatBat'],
    )
})

test("scan doesn't throw an error on empty sequence when given initial value", t => {
    const data = []
    t.deepEqual(
        toArray(scan(data, 'Fizzbuzz', _ => { throw new Error("Not reached!") })),
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
