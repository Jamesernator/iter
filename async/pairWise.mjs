import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

const _pairWise = iterableGenerator(async function* pairWise(iterable, allowShorter=false) {
    const iter = iterator(iterable)
    try {
        const { value, done } = await iter.next()
        if (done) {
            if (allowShorter) {
                return
            } else {
                throw new Error(`[pairWise] Can't get a pair from an empty sequence`)
            }
        }

        let last = value
        let gotPair = false
        for await (const item of iter) {
            gotPair = true
            yield [last, item]
            last = item
        }

        if (!gotPair && !allowShorter) {
            throw new Error(`[pairWise] Can't get a pair from sequence of size 1`)
        }
    } finally {
        await iter.return()
    }
})

function pairWise(iterable, allowShorter=false, ...rest) {
    assert.empty(rest, `[pairWise] Unexpected additional arguments to pairs`)
    assert.boolean(allowShorter, `[pairWise] allowShorter must be a boolean as other overloads are reversed for future use`)
    return _pairWise(iterable, allowShorter)
}
export default create(pairWise)
export { _pairWise as raw }
