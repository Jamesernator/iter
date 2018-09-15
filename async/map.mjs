import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

const _map = iterableGenerator(async function* map(iterable, mapperFn) {
    for await (const [idx, item] of enumerate(iterable)) {
        yield await mapperFn(item, idx)
    }
})

function map(iterable, mapperFn, ...rest) {
    assert.function(mapperFn, `[map] Expected mapperFn to be a function`)
    assert.empty(rest, `[map] Unexpected additional arguments to map`)
    return _map(iterable, mapperFn)
}

export default create(map)
export { _map as raw }
