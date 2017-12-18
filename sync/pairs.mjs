import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as iterator } from "./iterator.mjs"
import assert from "../--assert.mjs"

const _pairs = iterableGenerator(function* pairs(iterable) {
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

function pairs(iterable, ...rest) {
    assert.empty(rest, `Unexpected additional arguments to pairs`)
    return _pairs(iterable)
}

export default create(pairs)
export { _pairs as raw }
