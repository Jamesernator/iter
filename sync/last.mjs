import { raw as create } from "./createOperator.mjs"
import assert from "../--assert.mjs"

function lastOne(iterable) {
    let item
    let itemSet = false
    for (item of iterable) {
        itemSet = true
    }
    if (itemSet) {
        return item
    } else {
        throw new Error(`[last] Can't get last item of empty sequence`)
    }
}

function lastN(iterable, n, allowShorter=false) {
    const buff = []
    for (const item of iterable) {
        buff.push(item)
        if (buff.length > n) {
            buff.shift()
        }
    }
    if (buff.length === n) {
        return buff
    } else if (allowShorter) {
        return buff
    } else {
        throw new Error(`[last] Iterable not long enough to get last ${ n }`)
    }
}

function _last(iterable, n='single', ...args) {
    if (n === 'single') {
        return lastOne(iterable)
    } else {
        return lastN(iterable, ...args)
    }
}

function last(iterable, n='single', ...args) {
    assert(n === 'single' || typeof n === 'number',
        `[last] Expected n to be either a Number or the literal 'single'`,
    )
    if (n === 'single') {
        assert.empty(args, `[last] Unexpected additional arguments`)
        return lastOne(iterable)
    } else {
        const [allowShorter, ...rest] = args
        assert(typeof n === 'number', `[last] Expected argument to first to be number or "single" (default)`)
        assert(n >= 0, `[last] Expected a non-negative integer`)
        assert.empty(rest, `[last] Unexpected additional arguments to last`)
        return lastN(iterable, n, allowShorter)
    }
}

export default create(last)
export { _last as raw }
