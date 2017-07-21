import iterator from "./iterator.js"
import dualMethod from "./dualMethod.js"
/* Extended iterator converts an iterable into an iterator that
    has extended functionality such as the ability to get the return
    value after looping
*/
export default dualMethod(function extendedIterator() {
    const target = this
    const iter = iterator(target)
    // Get our actual iterator that we're transforming
    const res = {
        [Symbol.iterator]() {
            return this
        },
        done: false,
        final: undefined,
        target
    }

    res.next = function(...args) {
        const result = iter.next(...args)
        if (result.done) {
            if (!this.done) {
                this.final = result.value
                this.done = true
            }
        }
        return result
    }

    if (typeof iter.throw === 'function') {
        res.throw = function(...args) {
            const result = iter.throw(...args)
            if (result.done) {
                if (!this.done) {
                    this.final = result.value
                    this.done = true
                }
            }
            return result
        }
    }

    if (typeof iter.return === 'function') {
        res.return = function(...args) {
            const result = iter.return(...args)
            if (result.done) {
                if (!this.done) {
                    this.final = result.value
                    this.done = true
                }
            }
            return result
        }
    }
    return res
})
