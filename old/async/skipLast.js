import create from "./createMethod.js"

/* skipLast yields all elements of the given iterable except for the last
    n elements
*/
export default create(async function* skipLast(n=1, enforceLength=true) {
    const buffer = []
    for (let i=0; i < n; i++) {
        const { value, done } = await this.next()
        if (done) {
            if (enforceLength) {
                throw new Error(
                    `Couldn't ignore ${n} elements` +
                    ` from sequence of length ${i}`
                )
            } else {
                return value
            }
        }
        buffer.push(value)
    }
    while (true) {
        const { value, done } = await this.next()
        if (done) {
            return value
        } else {
            buffer.push(value)
            yield buffer.shift()
        }
    }
})
