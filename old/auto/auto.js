import dualMethod from "./dualMethod.js"

export default function auto(...args) {
    let syncFunc
    let asyncFunc
    let name
    if (args.length === 1) {
        [syncFunc] = args
        asyncFunc = syncFunc
        name = syncFunc.name
    } else if (args.length === 2) {
        [syncFunc, asyncFunc] = args
        name = syncFunc.name
    } else if (args.length === 3) {
        [name, syncFunc, asyncFunc] = args
    }
    const result = dualMethod(function(...rest) {
        if (this[Symbol.asyncIterator] instanceof Function) {
            return asyncFunc(this, ...rest)
        } else if (this[Symbol.iterator] instanceof Function) {
            return syncFunc(this, ...rest)
        } else {
            throw new Error("Target is not iterable")
        }
    })
    Object.defineProperty(result, 'name', { value: name })
    Object.defineProperty(result, 'sync', { value: syncFunc })
    Object.defineProperty(result, 'async', { value: asyncFunc })
    return result
}
