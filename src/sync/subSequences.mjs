import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

const _subSequences = iterableGenerator(
    function* subSequences(iterable, subSequenceSize, allowShorter=false) {
        const iter = iterator(iterable)
        try {
            const buff = []
            for (let i = 0; i < subSequenceSize; i += 1) {
                const { value, done } = iter.next()
                if (done) {
                    if (allowShorter) {
                        return
                    } else {
                        const message = `[subSequence] Can't get a subSequence of size ${ subSequenceSize } from a sequence of length ${ i }`
                        throw new Error(message)
                    }
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
            iter.return()
        }
    },
)

function subSequences(iterable, subSequenceSize, allowShorter=false, ...rest) {
    assert.number(subSequenceSize, `[subSequences] Expected subSequencesSize to be a number`)
    assert(subSequenceSize > 0, `[subSequences] Expected subSequencesSize to be larger than zero`)
    assert.boolean(allowShorter, `[subSequences] allowShorter must be a boolean as other types are reserved for future use in overloads`)
    assert.empty(rest, `[subSequences] Unexpected additional arguments to subSequences`)
    return _subSequences(iterable, subSequenceSize, allowShorter)
}

export default create(subSequences)
export { _subSequences as raw }
