import create from "./createMethod.js"

/* each takes the iteratee function and invokes it on each value in the
    iterable, the iteratee function recieves the current item, the current
    count and the target of the method
    the return value is whatever the return value of the iterable is
*/
export default create(['function?'],
    function each(iteratee=x => x) {
        let idx = 0
        for (const item of this) {
            iteratee(item, idx, this.target)
            idx += 1
        }
        return this.final
    }
)
