import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import { raw as iterator } from "./iterator.js"
import assert from "./#assert.js"

const _buffer = iterableGenerator(function* buffer(iterable, bufferSize=2) {
    const iter = iterator(iterable)
    const buff = []
    for (let i = 0 ; i < bufferSize ; i++) {
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
})

function buffer(iterable, bufferSize=2, ...rest) {
    assert.number(bufferSize, `Expected bufferSize to be a number`)
    assert(bufferSize > 0, `Expected bufferSize to be larger than zero`)
    assert.empty(rest, `Unexpected additional arguments to buffer`)
    return _buffer(iterable, bufferSize)
}

export default create(buffer)
export { _buffer as raw }
