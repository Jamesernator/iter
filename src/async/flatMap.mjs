import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import snapshotIterable from "./--snapshotIterable.mjs"
import assert from "../--assert.mjs"

const __flatMap = iterableGenerator(async function* flatMap(iterable, allowNonIterable, iteratee) {
    for await (const [idx, item] of enumerate(iterable)) {
        const value = await iteratee(item, idx)
        const snapshot = snapshotIterable(value)
        if (snapshot) {
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
    const [allowNonIterable, iteratee=x => [x]] =
        args.length === 0 ?
            [false, x => [x]]
        : args.length === 1 ?
            [false, ...args]
        :
            args
    return __flatMap(iterable, allowNonIterable, iteratee)
}

function flatMap(iterable, ...args) {
    const tooFewArgs = _ => {
        throw new Error(`[flatMap] Expected flatMapper function as argument to flatMap`)
    }

    const unexpectedArgs = _ => {
        throw new Error(`[flatMap] Unexpected additional arguments to flatMap`)
    }

    const [allowNonIterable, iteratee] =
        args.length === 0 ?
            tooFewArgs()
        : args.length === 1 ?
            [false, ...args]
        : args.length === 2 ?
            args
        :
            unexpectedArgs()

    assert.boolean(allowNonIterable, `[flatMap] allowNonIterable must be a boolean as other values are reserved for future use`)
    assert.function(iteratee, `[flatMap] Expected flatMap iteratee to be a function`)
    return __flatMap(iterable, allowNonIterable, iteratee)
}

export default create(flatMap)

export { _flatMap as raw }
