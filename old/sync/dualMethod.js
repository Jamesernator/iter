import match from "../match.js"

/* dualMethod takes a function and returns a new function that allows
    calling both as a bound method and as a regular function
    with the value as the first argument
    e.g.
    const map = dualMethod(function* map(f) {
        for (let i of this) {
            yield f(i)
        }
    })

    Array.from([1, 2, 3]::map(x => x**2)) // [1, 4, 9]
    Array.from(map([1, 2, 3], x => x**2)) // [1, 4, 9]
*/
export default function dualMethod(...dargs) {
    // create our decorated function
    if (typeof dargs[dargs.length-1] !== 'function') {
        throw new Error(`Expected function as last argument to dualMethod`)
    }
    const patterns = dargs.slice(0, -1)
    const func = dargs[dargs.length-1]
    const result = function(...args) {
        let target
        let realArgs
        // if this is undefined then we know its called a regular function
        if (this === undefined) {
            target = args[0]
            realArgs = args.slice(1)
        // otherwise its being called as an object method
        } else {
            target = this
            realArgs = args
        }
        if (patterns.length > 0 && !patterns.some(pattern => match(realArgs, pattern))) {
            throw new Error(`Wrong arguments to function "${func.name}"`)
        }
        // so call the original function with the real target and arguments
        return Reflect.apply(func, target, realArgs)
    }
    // preserve our function name
    Object.defineProperty(result, 'name', { value: func.name })
    return result
}
