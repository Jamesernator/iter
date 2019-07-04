import iterableGenerator from "./iterableGenerator.js";
import iterator from "./--iterator.js";
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default iterableGenerator(
    async function* pairWise<T>(
        iterable: AsyncOrSyncIterable<T>,
        allowShorter: boolean=false,
    ) {
        const iter = iterator(iterable)
        try {
            const { value, done } = await iter.next()
            if (done) {
                if (allowShorter) {
                    return
                } else {
                    throw new Error(`[pairWise] Can't get a pair from an empty sequence`)
                }
            }

            let last = value
            let gotPair = false
            for await (const item of iter) {
                gotPair = true
                yield [last, item]
                last = item
            }

            if (!gotPair && !allowShorter) {
                throw new Error(`[pairWise] Can't get a pair from sequence of size 1`)
            }
        } finally {
            await iter.return!()
        }
    }
)
