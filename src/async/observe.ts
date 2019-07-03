import iterableGenerator from "./iterableGenerator.js"
import enumerate from "./enumerate.js"
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

/* global console */

export default iterableGenerator(
    async function* observe<T>(
        iterable: AsyncOrSyncIterable<T>,
        callback: ((value: T, index: number) => any)=console.log
    ) {
        for await (const [idx, item] of enumerate(iterable)) {
            await callback(item, idx)
            yield item
        }
    }
)
