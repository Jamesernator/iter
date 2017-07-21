import create from "./createIterableMethod.js"

/* mapFinal takes an iterator and maps done=true value to a new value
    by whatever the iteratee returns,
    the iteratee is passed two arguments the final value and the current target
*/
export default create(async function* mapFinal(iteratee=x => x) {
    yield* this
    return await iteratee(this.final)
})
