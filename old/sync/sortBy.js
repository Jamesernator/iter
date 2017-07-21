import create from "./createMethod.js"
import sort from "./sort.js"

/* sortBy is like sort but instead of providing a comparison function
    you provide a method to extract the things to be compared using the
    standard <= operator, if reverse is true then comparison will be done
    with the >= operator
*/
export default create(function sortBy(iteratee=x => x, reverse=false) {
    let compare
    if (reverse) {
        compare = (a, b) => iteratee(a) >= iteratee(b)
    } else {
        compare = (a, b) => iteratee(a) <= iteratee(b)
    }
    return sort(this, compare)
})
