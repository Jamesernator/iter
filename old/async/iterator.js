import dualMethod from "./dualMethod.js"

/* Simply extracts the iterator out of the iterable */
export default dualMethod(function iterator() {
    try {
        return this[Symbol.asyncIterator]()
    } catch (e) {
        try {
            this[Symbol.iterator]()
        } catch (_) {
            throw e
        }
    }
    return null
})
