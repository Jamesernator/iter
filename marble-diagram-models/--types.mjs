import type from "./--unionType.mjs"

const Result = type({
    Pending: [],
    Value: {
        time: 'number',
        value: 'any',
    },
    Error: {
        time: 'number',
        error: 'any',
    },
})

const arrayOf = type => (arr, check) => {
    return Array.isArray(arr)
        && arr.every(item => check(item, type))
}

const Sequence = type({
    Incomplete: arrayOf({
        time: 'number',
        value: 'any',
    }),
    Complete: [
        arrayOf({
            time: 'number',
            error: 'any',
        }),
        { time: 'number', error: 'any' },
    ],
    EarlyError: [
        arrayOf({ time: 'number', value: 'any' }),
        { time: 'number', error: 'any' },
    ],
})

export { Result, Sequence }
