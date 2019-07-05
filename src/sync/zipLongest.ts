import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

type Unwrap<T> = T extends Iterable<infer R> ? R : never;
type ZipUnwrapped<T> = { [P in keyof T]: Unwrap<T[P]> | undefined };

const zipLongest = iterableGenerator(
    function* zipLongest<Iterables extends Array<Iterable<any>> | [Iterable<any>]>(
        iterables: Iterables,
    ): IterableIterator<ZipUnwrapped<Iterables>> {
        const iteratorsDone = new Set();
        const iterators: Array<any> = [];
        try {
            for (const iterable of iterables) {
                iterators.push(iterator(iterable));
            }

            while (true) {
                const nexts = iterators.map((iterator) => {
                    if (iteratorsDone.has(iterator)) {
                        return { done: true, value: undefined };
                    }
                    const result = iterator.next();
                    const { done } = result;
                    if (done) {
                        iteratorsDone.add(iterator);
                    }
                    return { done, value: result.value };
                });
                if (nexts.every(({ done }) => done)) {
                    return;
                }
                yield nexts.map(({ value }) => value) as unknown as ZipUnwrapped<Iterables>;
            }
        } finally {
            for (const iterator of iterators) {
                try {
                    iterator.return();
                } catch (_) {
                    /* Ensure all iterators close */
                }
            }
        }
    },
);

export { zipLongest as default };
