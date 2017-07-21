import create from "./createIterableMethod.js"
/* scan takes a  function and optionally as a first argument a
    initial value and repeatedly applies the  function of the current
    accumulated value and the next value in the sequence, it yields
    each intermediate result,
    the reducer function will be passed 4 arguments, the current
    accumulated value, the current value, the current index, and the target
    of the reduction,
    the return value of the iterator is returned as the return value of scan
*/

/* eslint-disable complexity */
export default create(async function* scan(...args) {
    let reducer
    let acc
    let idx = 0
    if (args.length === 0 || args.length === 1) {
        // if nothing is passed to reduce we'll just reduce using addition
        if (args.length === 0) {
            reducer = (x, y) => x + y
        } else {
            [reducer] = args
        }
        const { value, done } = await this.next()
        // if there's nothing in the sequence and no initial value
        // then determining the result is impossible
        if (done) {
            throw new Error('reduce called on empty iterable without initial value')
        }
        acc = value
        idx += 1
    } else if (args.length === 2) {
        // if two arguments are passed the first is considered the initial
        // value of the reduction, if null/undefined is passed as a second
        // argument then the function will default to addition
        [acc, reducer=(x, y) => x + y] = args
    }
    yield acc // Yield our initial value
    // For each item remaining reduce it using the reducer function
    for await (const item of this) {
        acc = await reducer(acc, item, idx, this.target)
        yield acc
        idx += 1
    }
    return acc
})
/* eslint-enable complexity */
