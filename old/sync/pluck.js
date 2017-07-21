import create from "./createIterableMethod.js"

/* pluck takes any number of property names and retrieves those from
    the given objects in the sequence
*/
export default create(function* pluck(...properties) {
    for (const item of this) {
        let current = item
        for (const property of properties) {
            current = current[property]
        }
        yield current
    }
    return this.final
})
