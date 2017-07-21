import create from "./createMethod.js"
import createIterable from "./createIterableMethod.js"

/* last returns the last element of the sequence, if a number is given
    as the first argument it returns an array of the last n items in
    the sequence
*/
const lastOne = create(async function lastOne(..._default) {
    const { done, value: _first } = await this.next()
    if (done) {
        if (_default.length === 0) {
            throw new Error(`Tried to get last of empty sequence without default`)
        } else {
            return _default[0]
        }
    }
    let _last = _first
    for await (const item of this) {
        _last = item
    }
    return _last
})

const lastN = createIterable(async function* lastN(n, enforceLength=true) {
    const _last = []
    for await (const item of this) {
        if (_last.length < n) {
            _last.push(item)
        } else {
            _last.shift()
            _last.push(item)
        }
    }
    if (enforceLength && _last.length < n) {
        throw new Error(
            `Tried to get ${n} items from sequence of length ${_last.length}`
        )
    }
    yield* _last
    return this.final
})

export default create(function last(n='single', ...rest) {
    if (n === 'single' || n == null) {
        return lastOne(this, ...rest)
    } else {
        return lastN(this, n, ...rest)
    }
})
