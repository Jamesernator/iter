import create from "./createMethod.js"

/* find takes a single predicate function and returns the first
    element for which the predicate function returns true,
    if default is not provided then
*/

const noDefault = Symbol('noDefault')

const unpackArgs = function(...args) {
    let predicate
    let default_ = noDefault
    if (args.length === 0) {
        predicate = x => x
    } else if (args.length === 1) {
        predicate = args[0]
    } else if (args.length === 2) {
        [default_, predicate] = args
    } else {
        throw new Error("Invalid args to find")
    }
    return {
        default: default_,
        predicate
    }
}

const _find = async function _find(...args) {
    const { predicate, default: default_ } = unpackArgs(...args)
    let idx = 0
    for await (const item of this) {
        if (await predicate(item, idx, this.target)) {
            const res = [item, idx]
            res.item = item
            res.index = idx
            return res
        }
        idx += 1
    }
    if (default_ === noDefault) {
        throw new Error("find found no item for which the predicate succeeded")
    } else {
        return {
            item: default_,
            index: null
        }
    }
}

const find = create(async function find(...args) {
    return (await Reflect.apply(_find, this, args)).item
})

find.withIndex = function withIndex(...args) {
    return Reflect.apply(_find, this, args)
}

export default find
