import create from "./createMethod.js"
import scan from "./scan.js"
import array from "./array.js"

/* reduceRight is identical to reduce except it works backwards through
    the iterable, because it works backwards it has to consume the entire
    iterable initially
*/
export default create(function scanRight(...args) {
    return scan(array(this).reverse(), ...args)
})
