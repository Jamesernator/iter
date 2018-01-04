import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import iterator from "./--iterator.mjs"
import assert from "../--assert.mjs"

const _takeUntil = iterableGenerator(async function* takeUntil(iterable, promise) {
    const terminated = Promise.resolve(promise).then(value => ({
        type: 'interrupt',
        value,
    }))
    const it = iterator(iterable)
    try {
        while (true) {
            const nextValue = Promise.resolve(it.next()).then(value => ({
                type: 'nextValue',
                value,
            }))
            const { type, value } = await Promise.race(nextValue, terminated)
            if (type === 'interrupt') {
                return
            } else {
                const { done, value: iteratorValue } = value
                if (done) {
                    return
                } else {
                    yield iteratorValue
                }
            }
        }
    } finally {
        await it.return()
    }
})

function takeUntil(iterable, ...args) {
    assert(args.length !== 0, `[takeUntil] Expected a promise to takeUntil`)
    assert(args.length < 2, `[takeUntil] Unexpected additional arguments to takeUntil`)
    return _takeUntil(iterable, ...args)
}

export default create(takeUntil)

export { _takeUntil as raw }
