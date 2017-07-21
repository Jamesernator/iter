import create from "./createIterableMethod.js"
import { plain as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

/* filter simply takes an iterable and returns a new iterable with the iteratee
    function applied to each of its arguments,
    the predicate function recieves two arguments, the value
    and the current index of the item
*/
function* filter(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `Expected filter predicate to be a function`)
    assert.empty(rest, `Unexpected additional arguments to map`)
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            yield item
        }
    }
}

export default create(filter)
export { filter as plain }
