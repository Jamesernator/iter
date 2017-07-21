import create from "./createIterableMethod.js"
import match from "../match.js"
import flatten from "./flatten.js"

/* map simply takes an iterable and returns a new iterable with the iteratee
    function applied to each of its arguments,
    the iteratee function recieves three arguments, the value, the current
    count of items and the target of iteration
    The return value is simply transferred
*/

const isPositive = x => typeof x === 'number' && x >= 0

const patterns = [
    ['function?'],
    ['function', 'function'],
    [isPositive, 'function'],
    [isPositive, 'function', 'function']
]

export default create(...patterns,
    function* flatMap(...args) {
        let iteratee
        let predicate
        let depth
        if (match(args, patterns[0])) {
            [iteratee=x => x] = args
            predicate = _ => true
            depth = 1
        } else if (match(args, patterns[1])) {
            [predicate, iteratee] = args
            depth = 1
        } else if (match(args, patterns[2])) {
            [depth, iteratee] = args
            predicate = _ => true
        } else if (match(args, patterns[3])) {
            [depth, predicate, iteratee] = args
        }
        let idx = 0
        for (const item of this) {
            if (depth === 0 || !predicate(item, idx, this.target)) {
                yield iteratee(item, idx, this.target)
            } else {
                yield* flatten(
                    iteratee(item, idx, this.target),
                    depth - 1
                )
            }
            idx += 1
        }
        return this.final
    }
)
