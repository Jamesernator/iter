import portable from "./#portable.js"
import { raw as isIterable } from "./isIterable.js"

function createIterableMethod(genFunc) {
    if (typeof genFunc !== 'function') {
        throw new Error(`Can't make iterable method from non-function`)
    }
    return portable((iterable, ...args) => {
        if (!isIterable(iterable)) {
            throw new Error(`Can't iteratee non-iterable`)
        }
        return Object.freeze({
            [Symbol.iterator]() {
                return genFunc(iterable, ...args)
            }
        })
    })
}

export default createIterableMethod
