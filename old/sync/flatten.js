import create from "./createIterableMethod.js"
import isIterable from "./isIterable.js"

/* flatten converts an iterable of iterables into a single iterable
    emitting values from the inner iterable as long as it has not exceeded
    maximum depth, optionally a predicate function may be provided to decide
    whether or not to flatten the item (will only be called if the item is
    actually iterable in the first place)
*/
const _flatten = create(['number??', 'function?'],
    function* flatten(depth=Infinity, flattenItem=_ => true) {
        if (depth == null) {
            /* eslint-disable no-param-reassign */
            depth = Infinity
            /* eslint-enable no-param-assign */
        }
        if (depth === 0) {
            yield* this
        } else {
            for (const item of this) {
                if (isIterable(item) && flattenItem(item)) {
                    yield* _flatten(item, depth-1, flattenItem)
                } else {
                    yield item
                }
            }
        }
        return this.final
    }
)

export default _flatten
