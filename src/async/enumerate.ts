import iterableGenerator from "./iterableGenerator.js"
import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";

export default iterableGenerator(
    async function* enumerate<T>(iterable: AsyncOrSyncIterable<T>) {
        let idx = 0
        for await (const item of iterable) {
            yield [idx, item] as const
            idx += 1
        }
    }
)
