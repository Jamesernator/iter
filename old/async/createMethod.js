import dualMethod from "./dualMethod.js"
import extendedIterator from "./extendedIterator.js"

/* This is for creating methods that don't return generator based iterators
    .e.g reduce, its main job is to convert the function into a dualMethod
    callable that recieves as an extendedIterator instead of the iterable
*/
export default function createMethod(func) {
    const result = dualMethod(function(...args) {
        const iter = extendedIterator(this)
        return Reflect.apply(func, iter, args)
    })
    Object.defineProperty(result, 'name', { value: func.name })
    return result
}
