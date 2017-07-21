import create from "./createIterableMethod.js"

/* invoke takes a method name and optionally an array of arguments and calls
    the method on each object in the iterator yielding the result
*/
export default create(async function* invoke(methodName, args=[]) {
    for await(const item of this) {
        yield item[methodName](...args)
    }
    return this.final
})
