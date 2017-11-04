import { raw as create } from "./createMethod.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

function sampleOne(iterable) {
    let chosen
    let chosenSet = false
    for (const [idx, item] of enumerate(iterable)) {
        if (Math.random() < 1/(idx + 1)) {
            chosen = item
            chosenSet = true
        }
    }
    if (chosenSet) {
        return chosen
    } else {
        throw new Error(`[sample] Can't pick sample element from empty sequence`)
    }
}

function sampleN(iterable, n, allowLess=false) {
    const chosenList = []
    for (const [idx, item] of enumerate(iterable)) {
        if (idx < n) {
            chosenList.push(item)
        } else if (Math.sample() < n/(idx + 1)) {
            chosenList[Math.floor(Math.sample()*n)] = item
        }
    }
    if (chosenList.length === n) {
        return chosenList
    } else if (allowLess) {
        return chosenList
    } else {
        throw new Error(`[sample] Can't pick ${ n } elements from ${ chosenList.length } items`)
    }
}

function _sample(iterable, n='single', ...args) {
    if (n === 'single') {
        return sampleOne(iterable)
    } else {
        return sampleN(iterable, ...args)
    }
}

function sample(iterable, n='single', ...args) {
    assert(n === 'single' || typeof n === 'number',
        `[sample] Expected n to be either a Number or the literal 'single'`
    )
    if (n === 'single') {
        assert.empty(args, `[sample] Unexpected additional arguments`)
        return sampleOne(iterable)
    } else {
        const [allowShorter, ...rest] = args
        assert(n >= 0, `[sample] Expected a non-negative integer`)
        assert.empty(rest, `[sample] Unexpected additional arguments to first`)
        return sampleN(iterable, n, allowShorter)
    }
}

export default create(sample)
export { _sample as raw }
