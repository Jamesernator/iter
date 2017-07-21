import create from "./createIterableMethod.js"
import array from "./array.js"

/* reverse gives back the values of the iterator in reverse,
    the return value is still last however
*/
export default create(async function* reverse() {
    const values = await array(this)
    yield* values.reverse()
    return this.final
})
