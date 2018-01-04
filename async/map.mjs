import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

const _map = iterableGenerator(async function* map(iterable, iteratee=x => x) {
    for await (const [idx, item] of enumerate(iterable)) {
        yield await iteratee(item, idx)
    }
})

function map(iterable, iteratee=x => x, ...rest) {
    assert.function(iteratee, `[map] Expected map iteratee to be a function`)
    assert.empty(rest, `[map] Unexpected additional arguments to map`)
    return _map(iterable, iteratee)
}

export default create(map)
export { _map as raw }
