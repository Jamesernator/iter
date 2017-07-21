import create from "./createIterableMethod.js"

/* invoke takes a method name and optionally an array of arguments and calls
    the method on each object in the iterator yielding the result
*/
export default create(function* invoke(methodName, args=[]) {
    for (const item of this) {
        yield item[methodName](...args)
    }
    return this.final
})
