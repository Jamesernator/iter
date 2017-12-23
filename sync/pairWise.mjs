import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as iterator } from "./iterator.mjs"
import assert from "../--assert.mjs"

const _pairWise = iterableGenerator(function* pairWise(iterable) {
    const iter = iterator(iterable)
    try {
        const { value, done } = iter.next()
        if (done) {
            return
        }

        let last = value
        for (const item of iter) {
            yield [last, item]
            last = item
        }
    } finally {
        iter.close()
    }
})

function pairWise(iterable, ...rest) {
    assert.empty(rest, `[pairWise] Unexpected additional arguments to pairs`)
    return _pairWise(iterable)
}

export default create(pairWise)
export { _pairWise as raw }
