import assert from "../--assert.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as iterator } from "./iterator.mjs"

const _merge = iterableGenerator(async function* merge(...iterables) {
    const iterators = iterables.map(iterator)
})
