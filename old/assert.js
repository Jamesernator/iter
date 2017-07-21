
/* asserts throws an error if the given value is falsy */
export default function assert(bool, message) {
    if (!bool) {
        throw new Error(`Assertion: ${message}`)
    }
}
