import create from "./createIterableMethod.js"
import { plain as enumerate } from "./enumerate.js"
import { plain as isIterable } from "./isIterable.js"

function* flatMap(iterable, ...args) {
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

export default create(flatMap)

export { flatMap as plain }
