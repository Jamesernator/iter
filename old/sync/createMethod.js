import dualMethod from "./dualMethod.js"
import extendedIterator from "./extendedIterator.js"

/* This is for creating methods that don't return generator based iterators
    .e.g reduce, its main job is to convert the function into a dualMethod
    callable that recieves as an extendedIterator instead of the iterable
    as the this value
*/
export default function createMethod(...cArgs) {
    const patterns = cArgs.slice(0, -1)
    const func = cArgs[cArgs.length-1]
    const result = dualMethod(...patterns, function(...args) {
        const iter = extendedIterator(this)
        return Reflect.apply(func, iter, args)
    })
    Object.defineProperty(result, 'name', { value: func.name })
    return result
}
