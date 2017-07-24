import create from "./createMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

function randomOne(iterable) {
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
        throw new Error(`[random] Can't pick random element from empty sequence`)
    }
}

function randomN(iterable, n, allowLess=false) {
    const chosenList = []
    for (const [idx, item] of enumerate(iterable)) {
        if (idx < n) {
            chosenList.push(item)
        } else if (Math.random() < n/(idx + 1)) {
            chosenList[Math.floor(Math.random()*n)] = item
        }
    }
    if (chosenList.length === n) {
        return chosenList
    } else if (allowLess) {
        return chosenList
    } else {
        throw new Error(`[random] Can't pick ${ n } elements from ${ chosenList.length } items`)
    }
}

function _random(iterable, n='single', ...args) {
    if (n === 'single') {
        return randomOne(iterable)
    } else {
        return randomN(iterable, ...args)
    }
}

function random(iterable, n='single', ...args) {
    assert(n === 'single' || typeof n === 'number',
        `[random] Expected n to be either a Number or the literal 'single'`
    )
    if (n === 'single') {
        assert.empty(args, `[random] Unexpected additional arguments`)
        return randomOne(iterable)
    } else {
        const [allowShorter, ...rest] = args
        assert(n >= 0, `[random] Expected a non-negative integer`)
        assert.empty(rest, `[random] Unexpected additional arguments to first`)
        return randomN(iterable, n, allowShorter)
    }
}

export default create(random)
export { _random as raw }
