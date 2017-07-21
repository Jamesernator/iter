import create from "./createIterableMethod.js"

/* between returns a sequence of all elements after a given index and
    before a given index
    WARNING: This may return different values per inspection if consuming
    an iterator rather than an iterable
*/
const isPositive = item => typeof item === 'number' && item > 0
export default create([isPositive, isPositive, 'boolean?'],
    function* between(lower, upper, enforceLength=true) {
        const buffer = []
        let final
        for (let i=0; i < upper; i++) {
            const { value, done } = this.next()
            if (done) {
                if (enforceLength) {
                    throw new Error(
                        `Tried to get elements between ${lower} and` +
                        ` ${upper} but only ${i} elements in the sequence.`
                    )
                } else {
                    return value
                }
            }
            if (i >= lower) {
                buffer.push(value)
            }
        }
        yield* buffer
        return final
    }
)
