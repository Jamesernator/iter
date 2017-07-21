import dualMethod from "./dualMethod.js"

/* Simply extracts the iterator out of the iterable */
export default dualMethod(function iterator() {
    return this[Symbol.iterator]()
})
