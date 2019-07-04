import iterableGenerator from "./iterableGenerator.js"
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default iterableGenerator(
    async function* debounceLeading<T>(
        iterable: AsyncOrSyncIterable<T>,
        time: number,
    ) {
        let previousTime = -Infinity
        for await (const item of iterable) {
            const now = Date.now()
            if (now - previousTime > time) {
                yield item
            }
            previousTime = now
        }
    }
)
