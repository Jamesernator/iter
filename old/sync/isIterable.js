import dualMethod from "./dualMethod.js"

/* isIterable returns true if the object is an iterable
    which implements Symbol.iterator
*/
export default dualMethod(function isIterable() {
    if (this == null) {
        return false
    } else {
        return this[Symbol.iterator] instanceof Function
    }
})
