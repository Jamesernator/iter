import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"

const _unique = iterableGenerator(function* unique(iterable, set=new Set()) {
    for (const item of iterable) {
        if (!set.has(item)) {
            set.add(item)
            yield item
        }
    }
})

function unique(iterable, set=new Set(), ...rest) {
    assert(typeof set.has === 'function',
        `[unique] Expected set object to have a has method`
    )
    assert(typeof set.add === 'function',
        `[unique] Expected set object to have an ass method`
    )
    assert.empty(rest, `[unique] Unexpected additional arguments`)
    return _unique(iterable, set)
}

export default create(unique)
export { _unique as raw }