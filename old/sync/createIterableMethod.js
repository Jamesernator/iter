import extendedIterator from "./extendedIterator.js"
import dualMethod from "./dualMethod.js"
/* createMethod takes a function that returns an iterable and turns it into an object
    that is iterable, the reason for this is that we want objects that
    will be reusable when bound to an iterable e.g.

    function* map(iteratee) {
        for (const item of this) {
            yield iteratee(item)
        }
    }

    const squares = [1, 2, 3]::map(x => x**2)
    console.log(Array.from(squares)) // [1, 4, 9]
    console.log(Array.from(squares)) // []

    With createMethod both console.log's would display [1, 4, 9].

    WARNING: createMethod does not make iterators readable more than once e.g.
    function* values() {
        yield 1
        yield 2
        yield 3
    }

    const squares = values()::map(x => x**2)
    console.log(Array.from(squares))
*/

export default function createIterableMethod(...cArgs) {
    // Return the decorated function that actually returns a map object
    const patterns = cArgs.slice(0, -1)
    const genFunc = cArgs[cArgs.length - 1]
    const result = dualMethod(...patterns, function(...args) {
        const iterMethod = _ => {
            const iter = extendedIterator(this)
            return Reflect.apply(genFunc, iter, args)
        }

        return {
            [Symbol.iterator]: iterMethod,
            type: 'sync',
            name: genFunc.name,
        }
    })
    Object.defineProperty(result, 'name', { value: genFunc.name })
    return result
}
