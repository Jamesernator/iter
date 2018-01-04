import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

const _pairWise = iterableGenerator(async function* pairWise(iterable) {
    const iter = iterator(iterable)
    try {
        const { value, done } = await iter.next()
        if (done) {
            return
        }

        let last = value
        for await (const item of iter) {
            yield [last, item]
            last = item
        }
    } finally {
        await iter.return()
    }
})

function pairWise(iterable, ...rest) {
    assert.empty(rest, `[pairWise] Unexpected additional arguments to pairs`)
    return _pairWise(iterable)
}

export default create(pairWise)
export { _pairWise as raw }
