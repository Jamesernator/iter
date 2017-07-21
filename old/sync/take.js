import create from "./createMethod.js"
import createIterable from "./createIterableMethod.js"

/* take returns the first item of a given sequence, if a number
    is given then take returns the first n items of the sequence
    in an array
*/
const takeOne = create(function takeOne(..._default) {
    const { value, done } = this.next()
    if (done) {
        if (_default.length === 0) {
            throw new Error("Couldn't take first of empty sequence without default")
        } else {
            return _default[0]
        }
    } else {
        return value
    }
})

const takeN = createIterable(function* takeN(n, enforceLength=true) {
    const result = []
    let i
    let final
    for (i=0; i < n; i++) {
        const { value, done } = this.next()
        if (done) {
            final = value
            break
        }
        result.push(value)
    }
    if (enforceLength && i < n) {
        throw new Error(
            `Couldn't take ${n} items from a sequence of length ${i}`
        )
    }
    yield* result
    return final
})

export default create(function take(n='single', ...rest) {
    if (n === 'single' || n == null) {
        return takeOne(this, ...rest)
    } else {
        return takeN(this, n, ...rest)
    }
})
