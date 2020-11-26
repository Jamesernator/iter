import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";

const enumerate = iterableGenerator(
    async function* enumerate<T>(
        iterable: AsyncOrSyncIterable<T>,
    ): AsyncGenerator<[number, T]> {
        let idx = 0;
        for await (const item of iterable) {
            yield [idx, item];
            idx += 1;
        }
    },
);

export { enumerate as default };
