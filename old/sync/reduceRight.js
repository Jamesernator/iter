import create from "./createMethod.js"
import reduce from "./reduce.js"
import array from "./array.js"

/* reduceRight is identical to reduce except it works backwards through
    the iterable, because it works backwards it has to consume the entire
    iterable initially
*/
export default create(function reduceRight(...args) {
    return reduce(array(this).reverse(), ...args)
})
