import { raw as create } from "./createMethod.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

function firstOne(iterable) {
    for (const item of iterable) {
        return item
    }
    throw new Error(`[first] Can't get first item of empty sequence`)
}

function firstN(iterable, n, allowShorter=false) {
    const buff = []
    for (const [idx, item] of enumerate(iterable)) {
        if (idx === n) {
            break
        }
        buff.push(item)
    }
    if (buff.length === n) {
        return buff
    } else if (allowShorter) {
        return buff
    } else {
        throw new Error(`[first] Iterable not long enough to get first ${ n }`)
    }
}

function _first(iterable, n='single', ...args) {
    if (n === 'single') {
        return firstOne(iterable)
    } else {
        return firstN(iterable, ...args)
    }
}

function first(iterable, n='single', ...args) {
    assert(n === 'single' || typeof n === 'number',
        `[first] Expected n to be either a Number or the literal 'single'`
    )
    if (n === 'single') {
        assert.empty(args, `[first] Unexpected additional arguments`)
        return firstOne(iterable)
    } else {
        const [allowShorter, ...rest] = args
        assert(n >= 0, `[first] Expected a non-negative integer`)
        assert.empty(rest, `[first] Unexpected additional arguments to first`)
        return firstN(iterable, n, allowShorter)
    }
}

export default create(first)
export { _first as raw }
