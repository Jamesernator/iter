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
    return {
        [Symbol.asyncIterator]() {
            return this
        },
        async next(...args) {
            /* transfer arguments, if we get a value and we're done
                then transfer the result to this.final
            */
            if (iter.next instanceof Function) {
                const result = await iter.next(...args)
                if (result.done) {
                    if (!this.done) {
                        this.final = result.value
                        this.done = true
                    }
                }
                return result
            } else {
                return undefined
            }
        },
        async throw(...args) {
            /* same as next but for throw */
            if (iter.throw instanceof Function) {
                const result = await iter.throw(...args)
                if (result.done) {
                    if (!this.done) {
                        this.final = result.value
                        this.done = true
                    }
                }
                return result
            } else {
                return undefined
            }
        },
        async return(...args) {
            /* effectively the same as next just for IterClose instead */
            if (iter.return instanceof Function) {
                const result = await iter.return(...args)
                if (result.done) {
                    if (!this.done) {
                        this.final = result.value
                        this.done = true
                    }
                }
                return result
            } else {
                return undefined
            }
        },
        // Whether or not the iterator is done
        done: false,
        // The value when first done, undefined otherwise
        final: undefined,
        target
    }
})
