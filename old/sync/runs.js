import create from "./createIterableMethod.js"

/* runs emits all subsequences of the given length */
export default create(function* runs(length=2) {
    const buffer = []
    for (let i=0; i<length; i++) {
        const { value, done } = this.next()
        if (done) {
            return value
        }
        buffer.push(value)
    }

    yield [...buffer]

    for (const item of this) {
        buffer.shift()
        buffer.push(item)
        yield [...buffer] // Ensure non-changing copy of buff
    }
    return this.final
})
