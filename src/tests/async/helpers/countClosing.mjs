
export default function countClosing(iterable, throwError=false) {
    if (!(iterable instanceof Array)) {
        // This simplifies tests so we'll prevent non-arrays for now
        throw new Error("closingIterable only accepts arrays for now")
    }
    let closed = 0
    return {
        get closed() {
            return closed
        },

        [Symbol.asyncIterator]() {
            const iterator = iterable[Symbol.iterator]()
            return {
                async next() {
                    return await iterator.next()
                },
                async return() {
                    if (throwError) {
                        throw new Error("[countClosing] Iterator closing error")
                    }
                    closed += 1
                    return { done: true, value: undefined }
                },
            }
        },
    }
}
