/* eslint-disable max-lines */
/* eslint-disable no-invalid-this */
import * as sync from "./iter.js"
export { sync }

/* iter simply returns the iterator from a given iterable */
export function iter(...args) {
    try {
        return this[Symbol.asyncIterator](...args)
    } catch (_) {
        try {
            return this[Symbol.iterator](...args)
        } catch (_) {
            throw new Error(`Couldn't get iterator from ${this}`)
        }
    }
}

export const iterator = iter

export function isIterable() {
    return (
        this[Symbol.asyncIterator] instanceof Function
        || this[Symbol.iterator] instanceof Function
    )
}

/* close closes the iterator by calling its return method */
export async function close(...args) {
    if (this.return instanceof Function) {
        return await this.return(...args)
    }
    return undefined
}

/* array simply turns the iterable into an array */
export async function array() {
    const arr = []
    for await (const item of this) {
        arr.push(item)
    }
    return arr
}

/* enumerate yields value/index pairs from the iterable */
export async function* enumerate() {
    let idx = 0
    for await (const item of this) {
        yield [item, idx]
        idx += 1
    }
}

/*  Each runs over an iterator applying the iteratee to each element from
    the iterable
*/
export async function each(iteratee, awaitIteratee=false) {
    let idx = 0
    for await (const item of this) {
        const value = iteratee(item, idx, this)
        if (awaitIteratee) {
            await value
        }
        idx += 1
    }
}

export const forEach = each


/* Map converts each element of the iterator into another value which
   is returned from iteratee
*/
export async function* map(iteratee) {
    let idx = 0
    for await (const item of this) {
        yield await iteratee(item, idx, this)
        idx += 1
    }
}

export const collect = map

/* Reduce applies the function iteratee to whatever the current accumulator
   value is and the next value in the iterable
*/

/* eslint-disable complexity */
/* eslint-disable max-statements */
export async function reduce(...args) {
    const _iter = Reflect.apply(iter, this, [])
    try {
        let iteratee
        let acc
        let idx = 0
        if (args.length === 0) {
            iteratee = (_acc, item) => _acc + item
            const { value: _first, done } = await _iter.next()
            if (done) {
                throw new Error('Reduce called on empty iterable without initial value')
            }
            acc = _first
            idx += 1
        } else if (args.length === 1) {
            [iteratee] = args
            const { value: _first, done } = await _iter.next()
            if (done) {
                throw new Error('Reduce called on empty iterable without initial value')
            }
            acc = _first
            idx += 1
        } else if (args.length === 2) {
            [acc, iteratee] = args
        }

        for await (const item of _iter) {
            acc = await iteratee(acc, item, idx, this)
            idx += 1
        }
        /* eslint-disable consistent-return */
        return acc
    } finally {
        await Reflect.apply(close, _iter, [])
    }
    /* eslint-enable consistent-return */
}
/* eslint-enable complexity */
/* eslint-disable max-statements */
export const inject = reduce
export const foldl = reduce


/* ReduceRight behaves identical to reduce but works through the iterator
   backwards
   WARNING: In order to iterate backwards the iterator will be coerced into
   an array so there may be large memory used by this function
*/

export async function reduceRight(...args) {
    const iterable = (await Reflect.apply(array, this, [])).reverse()
    return await Reflect.apply(reduce, iterable, args)
}

export const foldr = reduceRight

/* Scan is much like reduce but instead of returning a single value
   it yields each intermediate value
*/
/* eslint-disable complexity */
/* eslint-disable max-statements */
export async function* scan(...args) {
    const _iter = Reflect.apply(iter, this, [])
    try {
        let iteratee
        let acc
        let idx = 0
        if (args.length === 0) {
            iteratee = (_acc, item) => _acc + item
            const { value: _first, done } = await _iter.next()
            if (done) {
                throw new Error('Reduce called on empty iterable without initial value')
            }
            acc = _first
            idx += 1
        } else if (args.length === 1) {
            [iteratee] = args
            const { value: _first, done } = await _iter.next()
            if (done) {
                throw new Error('Scan called on empty iterable without initial value')
            }
            acc = _first
            idx += 1
        } else if (args.length === 2) {
            [acc, iteratee] = args
        }
        yield acc
        for await (const item of _iter) {
            acc = await iteratee(acc, item, idx, this)
            yield acc
            idx += 1
        }
        /* eslint-disable consistent-return */
        return acc
    } finally {
        await Reflect.apply(close, _iter, [])
    }
    /* eslint-enable consistent-return */
}
/* eslint-enable complexity */
/* eslint-enable max-statements */

/* scanRight behaves identical to scan but works through the iterator
   backwards
   WARNING: In order to iterate backwards the iterator will be coerced into
   an array so there may be large memory used by this function
*/

export async function scanRight(...args) {
    const iterable = (await Reflect.apply(array, this, [])).reverse()
    return await Reflect.apply(scan, iterable, args)
}

/* select applies the predicate function to the current accumulator and
   the current item, if the predicate function returns true then the
   accumulator will become whatever the current item is
*/
/* eslint-disable complexity */
export async function select(...args) {
    const _iter = Reflect.apply(iter, this, [])
    try {
        let predicate
        let acc
        let idx = 0

        if (args.length === 1) {
            [predicate] = args
            const { value: _first, done } = await _iter.next()
            if (done) {
                throw new Error('Reduce called on empty iterable without initial value')
            }
            acc = _first
            idx += 1
        } else if (args.length === 2) {
            [acc, predicate] = args
        }

        for await (const item of _iter) {
            if (await predicate(acc, item, idx, this)) {
                acc = item
            }
            idx += 1
        }
        /* eslint-disable consistent-return */
        return acc
    } finally {
        await Reflect.apply(close, _iter, [])
    }
    /* eslint-enable consistent-return */
}
/* eslint-enable complexity */


/* find applies the predicate function to each element in the iterable until
   it returns a truthy value, once it returns a truthy value it returns
   the first element to meet that predicate, throws an error if it
   can't find one
*/

export async function find(predicate) {
    let idx = 0
    for await (const item of this) {
        if (await predicate(item, idx, this)) {
            return item
        }
        idx += 1
    }
    throw new Error("No item could be found")
}

export const detect = find


/* filter goes through each element of the iterable and yields that item
   if the predicate function returns a truthy value when given that item
*/
export async function* filter(predicate=item => item) {
    let idx = 0
    for await (const item of this) {
        if (await predicate(item, idx, this)) {
            yield item
        }
        idx += 1
    }
}

/* reject goes through each element of the iterable and yields that item
   if the predicate function returns a falsy value
*/
export async function* reject(predicate=item => item) {
    let idx = 0
    for await (const item of this) {
        if (!await predicate(item, idx, this)) {
            yield item
        }
        idx += 1
    }
}

/* every returns true if the predicate holds true for every item in
   the iterable
   By vacuous truth returns true if the iterable is empty
*/
export async function every(predicate=item => item) {
    let idx = 0
    for await (const item of this) {
        if (!await predicate(item, idx, this)) {
            return false
        }
        idx += 1
    }
    return true
}

export const all = every

/* some returns true if the predicate holds true for at least one
   item in the iterable
   By vacuous truth returns false if the iterable is empty
*/
export async function some(predicate) {
    let idx = 0
    for await (const item of this) {
        if (await predicate(item, idx, this)) {
            return true
        }
        idx += 1
    }
    return false
}

export const any = some

/* contains returns true if the element has an element determined by
   equality using the === operator
*/

export async function contains(search) {
    for await (const item of this) {
        if (item === search) {
            return true
        }
    }
    return false
}

export const includes = contains
export const has = includes

/* invoke calls the method name given on each argument and yields
   the result passing additional arguments to the method
*/
export async function* invoke(method, ...args) {
    for await (const item of this) {
        yield item[method](...args)
    }
}

/* pluck transforms the values into property lookups on the values
   e.g. [{foo: {bar: 10}, ...}, {foo: {bar: 20}, ...}]::pluck('foo', 'bar')
   will create an iterator of [10, 20]
*/
export async function* pluck(...properties) {
    for await (const item of this) {
        let current = item
        for (const property of properties) {
            current = current[property]
        }
        yield current
    }
}

/* merge combines two iterables into a single iterable using the predicate
   function to decide which element comes next, when an iterable
   is exhausted we will simply emit the remaining elements of the
   other iterable
*/
/* eslint-disable complexity */
/* eslint-disable max-statements */
export async function* merge(other, lessThan=(x, y) => x < y) {
    const iter1 = Reflect.apply(iter, this, [])
    const iter2 = Reflect.apply(iter, other, [])
    try {
        let { done: done1, value: value1 } = await iter1.next()
        let { done: done2, value: value2 } = await iter2.next()
        while (!(done1 || done2)) {
            if (await lessThan(value1, value2)) {
                yield value1
                const result = await iter1.next()
                done1 = result.done
                value1 = result.value
            } else {
                yield value2
                const result = await iter2.next()
                done2 = result.done
                value2 = result.value
            }
        }
        if (done2) {
            yield value1
            yield* iter1
        }
        if (done1) {
            yield value2
            yield* iter2
        }
    } finally {
        try {
            await Reflect.apply(close, iter1, [])
        } finally {
            await Reflect.apply(close, iter2, [])
        }
    }
}
/* eslint-enable complexity */
/* eslint-enable max-statements */
export const mergeWith = merge

/* sorted returns an iterable of sorted values of the iterator,
   unlike the builtin Array.prototype.sort the stability of the algorithm is
   determined by the comparison function given.
   Also unlike Array.prototype.sort sorted expects a boolean from the
   comparison function, the comparison function should return true if
   the first argument is less than or equal to the second
   WARNING: This function will produce a potentially unbounded Array
   which is dependent on the size of the iterable
*/
export async function* sorted(lessThan=(x, y) => x < y) {
    let arr = await Reflect.apply(array, this, [])
    if (arr.length === 0) {
        return
    } else if (arr.length === 1) {
        yield* arr
    } else {
        const sortedLeft = await Reflect.apply(
            sorted,
            arr.slice(0, Math.floor(arr.length/2)),
            [lessThan]
        )
        const sortedRight = await Reflect.apply(
            sorted,
            arr.slice(Math.floor(arr.length/2)),
            [lessThan]
        )
        arr = null // Allow arr to be garbage collected
        yield* Reflect.apply(merge, sortedLeft, [sortedRight, lessThan])
    }
}

/* sortBy sorts elements according to iteratee instead of by a comparsion
   function
*/
export async function sortBy(iteratee=item => item, reverse=false) {
    let compare
    if (reverse) {
        compare = (item1, item2) => {
            return iteratee(item1) >= iteratee(item2)
        }
    } else {
        (item1, item2) => {
            return iteratee(item1) < iteratee(item2)
        }
    }
    return Reflect.apply(sorted, this, [compare])
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

/* yields values from the iterable passed to it in a random order
   WARNING: this function will convert the iterable to an array so may produce
   unbounded buffers
*/

export async function* shuffle() {
    const arr = await Reflect.apply(array, this, [])
    for (let i=0; i < arr.length - 1; i++) {
        const j = randomInteger(i, arr.length)
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        yield arr[i]
    }
}

// sample utility functions
async function singleSample() {
    const _iter = Reflect.apply(iter, this, [])
    try {
        const { value: _first, done } = await iter.next()
        if (done) {
            throw new Error("Tried to sample empty sequence")
        }
        let choice = _first
        let idx = 1
        for await (const item of _iter) {
            if (randomInteger(0, idx+1) === 0) {
                choice = item
            }
            idx += 1
        }
        return choice
    } finally {
        await Reflect.apply(close, _iter, [])
    }
}

async function multiSample(n) {
    const choices = []
    let idx = 0
    for await (const item of this) {
        if (choices.length < n) {
            choices.push(item)
        } else if (randomInteger(0, idx+1) < n) {
            choices[randomInteger(0, n)] = item
        }
        idx += 1
    }
    return choices
}

/* sample returns either a single element randomly chosen from the sequence
   or an array of elements if a number is given
*/
export async function sample(n='single', requireLength=true) {
    if (n === 'single') {
        return await Reflect.apply(singleSample, this, [])
    } else if (n === 0) {
        return []
    } else {
        const _sample = await Reflect.apply(multiSample, this, [n])
        if (requireLength && _sample.length < n) {
            throw new Error(
                `Request sample of size ${n} but got only ${_sample.length}`
            )
        }
        return _sample
    }
}

/* size simply returns how many elements are in the iterable */
export async function size() {
    let idx = 0
    for await (const _ of this) {
        idx += 1
    }
    return idx
}

export const length = size

/* splits the iterable into two iterables, those that satisfy the condition
   and those that do not
*/
export async function partition(predicate) {
    const satisfyBuffer = []
    const dontSatisfyBuffer = []
    const _iter = Reflect.apply(iter, this, [])

    /* eslint-disable complexity */
    async function* satisfy() {
        try {
            while (true) {
                while (satisfyBuffer.length > 0) {
                    yield satisfyBuffer.shift()
                }
                const { done, value } = await _iter.next()
                if (done) {
                    return
                }
                if (await predicate(value)) {
                    yield value
                } else {
                    dontSatisfyBuffer.push(value)
                }
            }
        } finally {
            await Reflect.apply(close, _iter, [])
        }
    }

    async function* dontSatisfy() {
        try {
            while (true) {
                while (dontSatisfyBuffer.length > 0) {
                    yield dontSatisfyBuffer.shift()
                }
                const { done, value } = await _iter.next()
                if (done) {
                    return
                }
                if (!await predicate(value)) {
                    yield value
                } else {
                    satisfyBuffer.push(value)
                }
            }
        } finally {
            await Reflect.apply(close, _iter, [])
        }
    }
    /* eslint-enable complexity */

    return [satisfy(), dontSatisfy()]
}

/* first returns the first element of the array if no argument is given
   otherwise it returns an array of the number given
*/
export async function first(n='single', enforceLength=true) {
    const _iter = Reflect.apply(iter, this, [])

    if (n === 'single') {
        try {
            const { value, done } = await _iter.next()
            if (done) {
                throw new Error("Couldn't take first of empty sequence")
            } else {
                return value
            }
        } finally {
            await Reflect.apply(close, _iter, [])
        }
    } else {
        const _first = async function*() {
            try {
                let i
                for (i=0; i < n; i++) {
                    const { value, done } = await _iter.next()
                    if (done) {
                        break
                    }
                    yield value
                }
                if (enforceLength && i < n) {
                    throw new Error(
                        `Couldn't take ${n} items from a sequence of size ${i}`
                    )
                }
            } finally {
                await Reflect.apply(close, _iter, [])
            }
        }
        return _first()
    }

}

export const head = first
export const take = first

/* initial yields all elements before the last n
   WARNING: this function buffers using an array so may consume large
   amounts of memory
*/
export async function* initial(n=1, enforceLength=true) {
    const _buffer = await Reflect.apply(array, this, [])
    if (enforceLength && _buffer.length < n) {
        throw new Error(
            `Couldn't ignore ${n} elements` +
            `from sequence of length ${_buffer.length}`
        )
    }
    for (let i=0; i < buffer.length - n; i++) {
        yield _buffer[i]
    }
}


/* last returns the last element of the given iterable,
   if a number is provided then it will yield the last n items
*/
/* eslint-disable complexity */
export async function last(n='single', enforceLength=true) {
    const _iter = Reflect.apply(iter, this, [])
    try {
        if (n === 'single') {
            const { done, value: _first } = await _iter.next()
            if (done) {
                throw new Error(`Tried to get last of empty sequence`)
            }
            let _last = _first
            for await (const item of _iter) {
                _last = item
            }
            return _last
        } else {
            const _last = []
            for await (const item of _iter) {
                if (_last.length < n) {
                    _last.push(item)
                } else {
                    _last.shift()
                    _last.push(item)
                }
            }
            if (enforceLength && _last.length < n) {
                throw new Error(
                    `Tried to get ${n} items from sequence of ${_last.length}`
                )
            }
            return _last
        }
    } finally {
        await Reflect.apply(close, _iter, [])
    }
}
/* eslint-enable complexity */

/* rest yields all elements but the first n elements */
export async function* rest(n=1, enforceLength=true) {
    const _iter = Reflect.apply(iter, this, [])
    try {
        for (let i=0; i < n; i++) {
            const { done } = await _iter.next()
            if (done && enforceLength) {
                throw new Error(
                    `Tried to take rest of elements starting at ${n}` +
                    ` from a sequence of length ${i}`
                )
            }
        }
        yield* _iter
    } finally {
        await Reflect.apply(close, _iter, [])
    }
}

export const tail = rest
export const drop = rest

/* between returns all items between the given indexes */
/* eslint-disable complexity */
/* eslint-disable consistent-return */
export async function* between(start, end, enforceLength=true) {
    const _iter = Reflect.apply(iter, this, [])
    try {
        for (let i=0; i < start; i++) {
            const { value, done } = await _iter.next()
            if (done) {
                if (enforceLength) {
                    throw new Error(
                        `Tried to get elements from ${start} but only ${i}` +
                        ` elements in the sequence`
                    )
                }
                return value
            }
        }
        for (let i=start; i < end; i++) {
            const { value, done } = await _iter.next()
            if (done) {
                if (enforceLength) {
                    `Tried to get elements up to ${end} but only ${i}` +
                    ` elements in the sequence`
                }
                return value
            }
            yield value
        }
    } finally {
        await Reflect.apply(close, _iter, [])
    }
}
/* eslint-enable complexity */
/* eslint-enable consistent-return */

/* flatten converts an iterable of iterables into a single iterable */
export async function* flatten(depth=Infinity, iterablesOnly=false) {
    for await (const item of this) {
        if (!Reflect.apply(isIterable, item, [])) {
            if (iterablesOnly) {
                throw new Error(
                    `flatten has iterablesOnly set to true but tried to` +
                    ` flatten value`
                )
            } else {
                yield item
            }
        } else {
            yield* Reflect.apply(flatten, item, [depth - 1, iterablesOnly])
        }
    }
}

/* without yields a sequence of values without the given values */
export async function* without(...values) {
    for await (const item of this) {
        if (!values.includes(item)) {
            yield item
        }
    }
}

/* zip takes in any number of iterables and yields arrays containing
   the ith item from each iterable, by default this is zipLongest and will
   fill remaining values with undefined
*/
/* eslint-disable complexity */
export async function* zip(...iterables) {
    const iters = [this, ...iterables].map(able => Reflect.apply(iter, able, this))
    try {
        while (true) {
            const nexts = await Promise.all(iters.map(_iter => _iter.next()))
            if (await Reflect.apply(all, nexts, [item => item.done])) {
                return
            } else {
                const values = nexts.map(item => item.value)
                yield values
            }
        }
    } finally {
        /* eslint-disable no-unsafe-finally */
        const errors = []
        for (const _iter of iters) {
            try {
                await Reflect.apply(close, _iter, [])
            } catch (e) {
                errors.push(e)
            }
        }

        for (const error of errors) {
            throw error
        }
        /* eslint-enable no-unsafe-finally */
    }
}
/* eslint-enable complexity */

export const zipLongest = zip

/* zipShortest is identical to zip but stops when a single iterable runs
   out of values
*/
/* eslint-disable complexity */
export async function* zipShortest(...iterables) {
    const iters = [this, ...iterables].map(able => Reflect.apply(iter, able, []))
    try {
        while (true) {
            const nexts = await Promise.all(iters.map(_iter => _iter.next()))
            if (await Reflect.apply(any, nexts, [item => item.done])) {
                return
            } else {
                const values = nexts.map(item => item.value)
                yield values
            }
        }
    } finally {
        /* eslint-disable no-unsafe-finally */
        const errors = []
        for (const _iter of iters) {
            try {
                await Reflect.apply(close, _iter, [])
            } catch (e) {
                errors.push(e)
            }
        }

        for (const error of errors) {
            throw error
        }
        /* eslint-enable no-unsafe-finally */
    }
}
/* eslint-enable complexity */

/* unzip takes an iterable of arrays and gives back n iterables which
   can be used to consume the items
   WARNING: consuming one of the n iterables faster will cause the rest
   to buffer in potentially unbounded arrays
*/
/* eslint-disable consistent-return */
/* eslint-disable complexity */
/* eslint-disable max-statements */
export async function unzip(n='calculate', _rest=true) {
    const _iter = Reflect.apply(iter, this, [])
    try {
        let width = n
        const buffers = []
        const restBuffer = []
        const streams = []
        const restStream = (async function*() {
            try {
                while (true) {
                    while (restBuffer.length > 0) {
                        yield restBuffer.shift()
                    }
                    const { value, done } = await _iter.next()
                    if (done) {
                        return value
                    }
                    for (let i=0; i < width; i++) {
                        buffers[i].push(value[i])
                    }
                    yield value.slice(width)
                }
            } finally {
                await Reflect.apply(close, _iter, [])
            }
        }())
        if (width === 'calculate') {
            const { done, value: _first } = await _iter.next()
            if (done) {
                throw new Error(`Can't unzip empty sequence`)
            }
            width = _first.length
            for (let i=0; i < width; i++) {
                buffers[i] = [_first[i]]
            }
        } else {
            for (let i=0; i < width; i++) {
                buffers[i] = []
            }
        }

        for (let i=0; i < width; i++) {
            streams.push(async function*() {
                try {
                    while (true) {
                        while (buffers[i].length > 0) {
                            yield buffers[i].shift()
                        }
                        const { value, done } = await _iter.next()
                        if (done) {
                            return value
                        }
                        for (let j=0; j < width; j++) {
                            if (j === i) {
                                continue
                            }
                            buffers[j].push(value[j])
                        }
                        if (_rest) {
                            restBuffer.push(value.slice(width))
                        }
                        yield value[i]
                    }
                } finally {
                    await Reflect.apply(close, _iter, [])
                }
            }())
        }

        /* eslint-disable consistent-return */
        if (n === 'calculate' || !_rest) {
            return streams
        } else {
            return [...streams, restStream]
        }
    } finally {
        await Reflect.apply(close, _iter, [])
    }
}
/* eslint-disable consistent-return */
/* eslint-enable complexity */
/* eslint-enable max-statements */

/* indexOf returns the first index where the given value can be found,
   takes an optional argument to ignore indexes before a given index
*/
export async function indexOf(value, fromIndex=0) {
    let idx = 0
    for await (const item of this) {
        if (item === value && idx >= fromIndex) {
            return idx
        }
        idx += 1
    }
    return null
}

/* lastIndexOf returns the last index where the item can be found */
export async function lastIndexOf(value, fromIndex=0) {
    let idx = 0
    let _last = null
    for await (const item of this) {
        if (item === value && idx >= fromIndex) {
            _last = idx
        }
        idx += 1
    }
    return _last
}


/* findIndex returns the first index where the predicate value returns true */
export async function findIndex(predicate, fromIndex=0) {
    let idx = 0
    for await (const item of this) {
        if (await predicate(item, idx, this) && idx >= fromIndex) {
            return idx
        }
        idx += 1
    }
    return null
}

/* findIndexLast returns the first index where the predicate is not found */
export async function findLastIndex(predicate, fromIndex=0) {
    let idx = 0
    let _last = null
    for await (const item of this) {
        if (await predicate(item, idx, this) && idx >= fromIndex) {
            _last = idx
        }
        idx += 1
    }
    return _last
}

/* followWith yields to the current iterable then yields to each iterable
   given
*/
export async function* followWith(...iterables) {
    yield* this
    for (const iterable of iterables) {
        yield* iterable
    }
}

/* range returns an iterator of values from the given start to the given end
   moving according to step
*/
/* eslint-disable complexity */
export function* range(...args) {
    let lower
    let upper
    let step
    if (args.length === 1) {
        [upper] = args
        lower = 0
        step = 1
    } else if (args.length === 2) {
        [lower, upper] = args
        step = 1
    } else {
        [lower, upper, step] = args
    }
    if (step < 0) {
        for (let i = upper; i > lower; i += step) {
            yield i
        }
        return upper
    } else {
        for (let i = lower; i < upper; i += step) {
            yield i
        }
        return upper
    }
}
/* eslint-enable complexity */

/* groupBy returns a Map like object (Map by default) of the iterable,
   a Map like object may optionally be passed in to use */
export async function groupBy(iteratee=item => item, _map=new Map()) {
    let idx = 0
    for await (const item of this) {
        const group = await iteratee(item, idx, this)
        if (_map.has(group)) {
            _map.get(group).push(item)
        } else {
            _map.set(group, [item])
        }

        idx += 1
    }
    return _map
}

/* indexBy returns a Map like object that maps the values of iteratee
   to the value of the item
*/
export async function indexBy(iteratee=item => item, _map=new Map()) {
    let idx = 0
    for await (const item of this) {
        const key = await iteratee(item, idx, this)
        _map.set(key, item)
        idx += 1
    }
    return _map
}

/* countBy returns a Map like object that maps the values of iteratee
   to the count of values for the returned key
*/
export async function countBy(iteratee=item=>item, _map=new Map()) {
    let idx = 0
    for await (const item of this) {
        const key = await iteratee(item, idx, this)
        if (!_map.has(key)) {
            _map.set(key, 0)
        }
        _map.set(key, _map.get(key) + 1)
        idx += 1
    }
    return _map
}

/* uniq yields a sequence of values in the order given but will only
   emit each element once
   WARNING: this function uses a Set to keep track of items so may consume
   memory as large as the length of the iterable
*/
export async function* uniq(iteratee=item => item) {
    const seen = new Set()
    let idx = 0
    for await (const item of this) {
        const key = await iteratee(item, idx, this)
        if (!seen.has(key)) {
            seen.add(key)
            yield item
        }
        idx += 1
    }
}

export const unique = uniq

/* repeat takes an iterable and repeatedly replays it over and over
   the number of times given
*/
export async function* repeat(times=Infinity) {
    for (let i=0; i < times; i++) {
        yield* this
    }
}

// ------------- Async Only Methods ------------- //

export async function* takeUntil(condition) {
    const conditional = Promise.resolve(condition).then((result) => {
        return {
            interrupt: true,
            value: result
        }
    })
    const _iter = Reflect.apply(iter, this, [])
    try {
        while (true) {
            const nextIteration = _iter.next().then((result) => {
                return {
                    interrupt: false,
                    value: result
                }
            })
            const next = await Promise.race([nextIteration, conditional])
            if (next.interrupt) {
                return next.value
            } else if (next.value.done) {
                return next.value.value
            } else {
                yield next.value.value
            }
        }
    } finally {
        await Reflect.apply(close, _iter, [])
    }
}

// Promise utilities
function never() {
    return new Promise(_ => { /* never resolve */ })
}

/* combine takes any number of async iterables and yields from them
   in order that they resolve
*/
/* eslint-disable complexity */
/* eslint-disable max-statements */
export async function* combine(...iterables) {
    const streams = [this, ...iterables]
    const _iters = streams.map(iterable =>
        Reflect.apply(iter, iterable, [])
    )
    try {
        const dones = Array(_iters.length)
        const completionResults = Array(_iters.length)
        const _next = Array(_iters.length)
        for (let idx=0; idx < _iters.length; idx++) {
            const _iter = _iters[idx]
            _next[idx] = _iter.next().then(result => {
                return {
                    iteration: result,
                    iterator: _iter,
                    idx
                }
            })
        }
        while (true) {
            const iterResult = await Promise.race(_next)
            if (iterResult.iteration.done) {
                completionResults[iterResult.idx] = iterResult.iteration.value
                _next[iterResult.idx] = never()
                dones[iterResult.idx] = true
                if (Reflect.apply(sync.all, dones, [])) {
                    return dones
                }
            } else {
                yield iterResult.iteration.value
                _next[iterResult.idx] = _iters[iterResult.idx]
                    .next()
                    .then(result => {
                        return {
                            iteration: result,
                            iterator: iterResult.iterator,
                            idx: iterResult.idx
                        }
                    })
            }
        }
    } finally {
        /* eslint-disable no-unsafe-finally */
        const errors = []
        for (const _iter of _iters) {
            try {
                await Reflect.apply(close, _iter, [])
            } catch (e) {
                errors.push(e)
            }
        }

        for (const error of errors) {
            throw error
        }
        /* eslint-enable no-unsafe-finally */
    }
}
/* eslint-enable complexity */
/* eslint-enable max-statements */

/* buffer groups the iterable into arrays of the length given instead of
   emitting items individually
*/
export async function* buffer(_length=1) {
    let _buffer = []
    for await (const item of this) {
        _buffer.push(item)
        if (_buffer.length === _length) {
            yield _buffer
            _buffer = []
        }
    }
    if (_buffer.length > 0) {
        yield _buffer
    }
}

/* bufferWith instead of buffering according to a length takes
   a Promise-factory and will await each generated Promise from the factory
*/
export async function* bufferWith(promiseFactory=() => null, ...args) {
    const _iter = Reflect.apply(iter, this, [])
    try {
        let currentSignal = Promise.resolve(promiseFactory(...args)).then(result => {
            return {
                interrupt: true,
                value: result
            }
        })
        let _buffer = []
        while (true) {
            const iterResult = _iter.next().then(result => {
                return {
                    interrupt: false,
                    value: result
                }
            })
            const res = await Promise.race(iterResult, currentSignal)
            if (res.interrupt) {
                yield _buffer
                _buffer = []
                currentSignal = Promise.resolve(promiseFactory(...args)).then(result => {
                    return {
                        interrupt: true,
                        value: result
                    }
                })
            } else if (res.value.done) {
                return res.value.value
            } else {
                _buffer.push(res.value.value)
            }
        }
    } finally {
        Reflect.apply(close, _iter, [])
    }
}

/* bufferWithSequence will use another async iterable to determine when to
   next buffer
*/

export async function* bufferWithSequence(sequence) {
    const _iter = Reflect.apply(iter, this, [])
    const _interrupt = Reflect.apply(iter, sequence, [])
    try {
        let currentSignal = _interrupt.next().then(result => {
            return {
                interrupt: true,
                value: result
            }
        })
        let _buffer = []
        while (true) {
            const iterResult = _iter.next().then(result => {
                return {
                    interrupt: false,
                    value: result
                }
            })
            const res = await Promise.race([iterResult, currentSignal])
            if (res.interrupt) {
                yield _buffer
                _buffer = []
                currentSignal = _interrupt.next().then(result => {
                    return {
                        interrupt: true,
                        value: result
                    }
                })
            } else if (res.value.done) {
                return res.value.value
            } else {
                _buffer.push(res.value.value)
            }
        }
    } finally {
        await Promise.all([
            Reflect.apply(close, _iter, []),
            Reflect.apply(close, _interrupt, [])
        ])
    }
}


/* debounce filters a sequence by using a Promise factory to determine when
   to allow emitting another item
*/
export async function* debounce(promiseFactory=() => null, ...args) {
    const _iter = Reflect.apply(iter, this, [])
    try {
        let { value, done } = await _iter.next()
        while (!done) {
            const nextIteration = _iter.next().then(item => {
                return {
                    emit: false,
                    value: item
                }
            })
            const res = await Promise.race([
                nextIteration,
                Promise.resolve(promiseFactory(...args)).then(item => {
                    return {
                        emit: true,
                        value: item
                    }
                })
            ])
            if (res.emit) {
                yield value
                ;({ value, done } = (await nextIteration).value)

            } else {
                ({ value, done } = res.value)
            }
        }
        return value
    } finally {
        Reflect.apply(close, this, [])
    }
}

/* throttle yields only the first value after awaiting each call
   to the promise factory
   TODO
*/
export async function*

/* after starts yielding values only after the given promise is resolved */
export async function* after(promise) {
    await promise
    yield* this
}
