import test from "ava"
import filter from "../../src/sync/filter.js"
import array from "../../src/sync/array.js"
import withFinal from "../../src/sync/withFinal.js"
import final from "../../src/sync/final.js"

test('filter basic functionality', t => {
    const data = [1,2,3,4,5,6,7,8,9,10]

    t.deepEqual(
        data::filter(x => x % 3 === 0)::array(),
        [3,6,9]
    )

})

test('filter receives correct arguments', t => {
    const data = [4,3,2,1]

    t.deepEqual(
        data::filter((_, idx) => idx % 2 === 0)::array(),
        [4, 2]
    )

    t.deepEqual(
        data::filter((_, __, target) => target === data)::array(),
        [4,3,2,1]
    )
})

test('filter preserves completion value', t => {
    const data = [1,2,3,4,5]::withFinal('banana')

    t.is(
        data::filter(x => x % 2 === 0)::final(),
        'banana'
    )
})

test('filter throws early on bad input', t => {
    t.throws(_ => {
        []::filter(2)
    })

    t.throws(_ => {
        []::filter(_ => true, 'banana')
    })
})
