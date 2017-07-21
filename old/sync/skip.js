import create from "./createIterableMethod.js"

/* skips returns an array without the first n items */
export default create(function* skip(n, enforceLength=true) {
    for (let i=0; i < n; i++) {
        const { value, done } = this.next()
        if (done) {
            if (enforceLength) {
                throw new Error(
                    `Couldn't ignore ${n} elements` +
                    `from sequence of length ${i}`
                )
            } else {
                return value
            }
        }
    }
    yield* this
    return this.final
})
