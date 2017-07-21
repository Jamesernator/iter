import create from "./createIterableMethod.js"

/* withFinal takes an iterator and yields from it while giving the value
    as the done value
*/
export default create(function* withFinal(value) {
    yield* this
    return value
})
