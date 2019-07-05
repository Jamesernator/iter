import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

type Unwrap<T> = T extends AsyncOrSyncIterable<infer R> ? R : never;
type ZipUnwrapped<T> = { [P in keyof T]: Unwrap<T[P]> };

const zip = iterableGenerator(
    async function* zip<
        Iterables extends Array<AsyncOrSyncIterable<any>> | [AsyncOrSyncIterable<any>]
    >(
        iterables: Iterables,
    ): AsyncIterableIterator<ZipUnwrapped<Iterables>> {
        const iteratorsDone = new Set();
        const iterators: Array<any> = [];
        try {
            for (const iterable of iterables as any) {
                iterators.push(iterator(iterable) as any);
            }

            while (true) {
                const nexts = await Promise.all(iterators.map(async (iterator) => {
                    if (iteratorsDone.has(iterator)) {
                        return { done: true, value: undefined };
                    }
                    const result = await iterator.next();
                    const { done } = result;
                    if (done) {
                        iteratorsDone.add(iterator);
                    }
                    return { done, value: result.value };
                }));
                if (nexts.some(({ done }) => done)) {
                    return;
                }
                yield nexts.map(({ value }) => value) as unknown as ZipUnwrapped<Iterables>;
            }
        } finally {
            for (const iterator of iterators) {
                try {
                    await iterator.return!();
                } catch (error) {
                    /* Ensure all iterators close */
                }
            }
        }
    },
);

export { zip as default };
