import create from "./createIterableMethod.js"
import { raw as enumerate } from "./enumerate.js"
import { raw as isIterable } from "./isIterable.js"
import assert from "./#assert.js"

function* __flatMap(iterable, allowNonIterable, iteratee) {
    for (const [idx, item] of enumerate(iterable)) {
        const value = iteratee(item, idx)
        if (isIterable(value)) {
            yield* value
        } else if (allowNonIterable) {
            yield value
        } else {
            throw new Error(
                `Can't flatten non-iterable in flatMap. Consider passing true as first arugment to flatMap.`
            )
        }
    }
}

function _flatMap(iterable, ...args) {
    /* eslint-disable indent */
    const [allowNonIterable, iteratee] =
        args.length === 0 ?
            [false, x => [x]]
        : args.length === 1 ?
            [false, ...args]
        :
            args
    /* eslint-enable indent */
    return __flatMap(iterable, allowNonIterable, iteratee)
}

function flatMap(...args) {
    const unexpectedArgs = _ => {
        throw new Error(`Unexpected additional arguments to flatMap`)
    }

    /* eslint-disable indent */
    const [allowNonIterable, iteratee] =
        args.length === 0 ?
            [false, x => [x]]
        : args.length === 1 ?
            [false, ...args]
        : args.length === 2 ?
            args
        :
            unexpectedArgs()
    /* eslint-enable indent */

    assert.function(iteratee, `Expected flatMap iteratee to be a function`)
    return __flatMap(allowNonIterable, iteratee)
}

export default create(flatMap)

export { _flatMap as raw }
