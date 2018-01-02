import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

const _subSequences = iterableGenerator(function* subSequences(iterable, subSequenceSize=2) {
    const iter = iterator(iterable)
    try {
        const buff = []
        for (let i = 0; i < subSequenceSize; i += 1) {
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
    assert.number(subSequenceSize, `[subSequences] Expected subSequencesSize to be a number`)
    assert(subSequenceSize > 0, `[subSequences] Expected subSequencesSize to be larger than zero`)
    assert.empty(rest, `[subSequences] Unexpected additional arguments to subSequences`)
    return _subSequences(iterable, subSequenceSize)
}

export default create(subSequences)
export { _subSequences as raw }
