import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

const pairWise = iterableGenerator(
    async function* pairWise<T>(
        iterable: AsyncOrSyncIterable<T>,
        allowShorter: boolean=false,
    ): AsyncGenerator<[T, T]> {
        const iter = iterator(iterable);
        try {
            const res = await iter.next();
            if (res.done) {
                if (allowShorter) {
                    return;
                }
                throw new Error(`[pairWise] Can't get a pair from an empty sequence`);
            }

            let last = res.value;
            let gotPair = false;
            for await (const item of iter) {
                gotPair = true;
                yield [last, item];
                last = item;
            }

            if (!gotPair && !allowShorter) {
                throw new Error(`[pairWise] Can't get a pair from sequence of size 1`);
            }
        } finally {
            await iter.return();
        }
    },
);

export { pairWise as default };
