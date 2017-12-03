import { raw as create } from "./createMethod.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import { raw as isIterable } from "./isIterable.mjs"
import assert from "../--assert.mjs"

const __flatMap = iterableGenerator(function* flatMap(iterable, allowNonIterable, iteratee) {
    for (const [idx, item] of enumerate(iterable)) {
        const value = iteratee(item, idx)
        if (isIterable(value)) {
            yield* value
        } else if (allowNonIterable) {
            yield value
        } else {
            throw new Error(
                `[flatMap] Can't flatten non-iterable in flatMap. Consider passing true as first arugment to flatMap.`,
            )
        }
    }
})

function _flatMap(iterable, ...args) {
    /* eslint-disable indent */
    const [allowNonIterable, iteratee=x => [x]] =
        args.length === 0 ?
            [false, x => [x]]
        : args.length === 1 ?
            [false, ...args]
        :
            args
    /* eslint-enable indent */
    return __flatMap(iterable, allowNonIterable, iteratee)
}

function flatMap(iterable, ...args) {
    const unexpectedArgs = _ => {
        throw new Error(`[flatMap] Unexpected additional arguments to flatMap`)
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

    assert.function(iteratee, `[flatMap] Expected flatMap iteratee to be a function`)
    return __flatMap(iterable, allowNonIterable, iteratee)
}

export default create(flatMap)

export { _flatMap as raw }