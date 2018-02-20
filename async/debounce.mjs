import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

function delay(time, value) {
    return new Promise(resolve => setTimeout(resolve, time, value))
}

const debounceLeading = iterableGenerator(async function* debounceLeading(iterable, time) {
    let previousTime = -Infinity
    for await (const item of iterable) {
        const now = Date.now()
        if (now - previousTime > time) {
            yield item
        }
        previousTime = now
    }
})

const debounceTrailing = iterableGenerator(async function* debounceTrailing(iterable, time) {
    const it = iterator(iterable)

    const next = _ => Promise.resolve(it.next()).then(iteratorResult => ({ type: 'iterationResult', iteratorResult }))

    try {
        let { value: previousValue, done } = await it.next()
        if (done) {
            return
        }
        let nextResult = next()
        while (true) {
            const val = await Promise.race([
                nextResult,
                delay(time, { type: 'delay' }),
            ])
            if (val.type === 'delay') {
                yield previousValue
                const iterResult = await nextResult
                if (iterResult.done) {
                    return
                }
                nextResult = next()
                previousValue = iterResult.value
            } else if (val.iteratorResult.done) {
                return
            } else {
                previousValue = val.iteratorResult.value
                nextResult = next()
            }
        }
    } finally {
        await it.return()
    }
})

function _debounce(iterable, time, trailing=false) {
    if (trailing) {
        return debounceTrailing(iterable, time)
    } else {
        return debounceLeading(iterable, time)
    }
}

function debounce(iterable, time, trailing=false, ...rest) {
    assert.type('number', time, `[debounce] Expected time to be a number`)
    assert(time >= 0, `[debounce] time must be a non-negative integer`)
    assert.empty(rest, `[debounce] Unexpected additional arguments to debounce`)
    return _debounce(iterable, time, trailing)
}

export default create(debounce)

export { _debounce as raw }
