import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

type Unwrap<T> = T extends AsyncOrSyncIterable<infer R> ? R : never;
type ZipUnwrapped<T> = { [P in keyof T]: Unwrap<T[P]> | undefined };

const zipLongest = iterableGenerator(
    async function* zipLongest<
        Iterables extends Array<AsyncOrSyncIterable<any>> | [AsyncOrSyncIterable<any>]
    >(
        iterables: Iterables,
    ): AsyncIterableIterator<ZipUnwrapped<Iterables>> {
        const iteratorsDone = new Set();
        const iterators: Array<any> = [];
        try {
            for (const iterable of iterables) {
                iterators.push(iterator(iterable));
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
                if (nexts.every(({ done }) => done)) {
                    return;
                }
                yield nexts.map(({ value }) => value) as unknown as ZipUnwrapped<Iterables>;
            }
        } finally {
            for (const iterator of iterators) {
                try {
                    await iterator.return();
                } catch (_) {
                    /* Ensure all iterators close */
                }
            }
        }
    },
);

export { zipLongest as default };
