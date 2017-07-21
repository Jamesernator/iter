import create from "./createIterableMethod.js"
import { plain as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

/* map simply takes an iterable and returns a new iterable with the iteratee
    function applied to each of its arguments,
    the iteratee function recieves two arguments, the value
    and the current index of the item
*/
function* map(iterable, iteratee=x => x, ...rest) {
    assert.function(iteratee, `Expected map iteratee to be a function`)
    assert.empty(rest, `Unexpected additional arguments to map`)
    for (const [idx, item] of enumerate(iterable)) {
        yield iteratee(item, idx)
    }
}

export default create(map)
export { map as plain }
