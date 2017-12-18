import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as iterator } from "./iterator.mjs"
import assert from "../--assert.mjs"

const _subSequences = iterableGenerator(function* subSequences(iterable, subSequenceSize=2) {
    const iter = iterator(iterable)
    try {
        const buff = []
        for (let i = 0; i < subSequenceSize; i++) {
            const { value, done } = iter.next()
            if (done) {
                return
            }
            buff.push(value)
        }

        for (const item of iter) {
            yield [...buff]
            buff.shift()
            buff.push(item)
        }
        yield [...buff]
    } finally {
        iter.close()
    }
})

function subSequences(iterable, subSequenceSize=1, ...rest) {
    assert.number(subSequenceSize, `Expected subSequencesSize to be a number`)
    assert(subSequenceSize > 0, `Expected subSequencesSize to be larger than zero`)
    assert.empty(rest, `Unexpected additional arguments to subSequences`)
    return _subSequences(iterable, subSequenceSize)
}

export default create(subSequences)
export { _subSequences as raw }
