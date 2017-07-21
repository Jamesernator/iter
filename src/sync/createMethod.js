import portable from "./#portable.js"
import { raw as isIterable } from "./isIterable.js"

function createMethod(func) {
    if (typeof func !== 'function') {
        throw new Error(`Can't create a method from non-function`)
    }
    return portable((iterable, ...args) => {
        if (!isIterable(iterable)) {
            throw new Error(`Can't iteratee non-iterable`)
        }
        return func(iterable, ...args)
    })
}

export default createMethod
