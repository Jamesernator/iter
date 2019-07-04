import iterator from "./--iterator.js";
import iterableGenerator from "./iterableGenerator.js";

type Unwrap<T> = T extends Iterable<infer R> ? R : never
type ZipUnwrapped<T> = { [P in keyof T]: Unwrap<T[P]> | undefined }

export default iterableGenerator(
    function* zipLongest<Iterables extends Iterable<any>[] | [Iterable<any>]>(
        iterables: Iterables,
    ): IterableIterator<ZipUnwrapped<Iterables>>  {
        const iteratorsDone = new Set()
        const iterators: any[] = []
        try {
            for (const iterable of iterables) {
                iterators.push(iterator(iterable))
            }

            while (true) {
                const nexts = iterators.map(iterator => {
                    if (iteratorsDone.has(iterator)) {
                        return { done: true, value: undefined }
                    }
                    const result = iterator.next()
                    const done = result.done
                    if (done) {
                        iteratorsDone.add(iterator)
                    }
                    return { done, value: result.value }
                })
                if (nexts.every(({ done }) => done)) {
                    return
                }
                yield nexts.map(({ value }) => value) as unknown as ZipUnwrapped<Iterables>
            }
        } finally {
            for (const iterator of iterators) {
                try {
                    iterator.return()
                } catch (_) {
                    /* Ensure all iterators close */
                }
            }
        }
    }
)
