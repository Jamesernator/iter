import create from "./createIterableMethod.js"

/* repeat takes an iterable and repeatedly replays it over and over
   the number of times given
*/
export default create(function* repeat(times=Infinity) {
    for (let i=0; i < times; i++) {
        yield* this
    }
    return this.final
})
