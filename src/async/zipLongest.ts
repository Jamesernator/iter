import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

type Unwrap<T> = T extends AsyncOrSyncIterable<infer R> ? R : never;
type ZipUnwrapped<T, Default=undefined> = {
    [P in keyof T]: Unwrap<T[P]> | Default
};

const zipLongest = iterableGenerator(
    async function* zipLongest<
        Iterables extends Array<AsyncOrSyncIterable<any>> | [AsyncOrSyncIterable<any>],
        Default=undefined,
    >(
        iterables: Iterables,
        createDefault: () => Default=() => undefined as unknown as Default,
    ): AsyncGenerator<ZipUnwrapped<Iterables>> {
        const iteratorsDone = new Set();
        const iterators: Array<any> = [];
        const errors: Array<any> = [];
        try {
            for (const iterable of iterables) {
                iterators.push(iterator(iterable));
            }

            while (true) {
                const nexts = await Promise.all(iterators.map(async (iterator) => {
                    if (iteratorsDone.has(iterator)) {
                        return { done: true, value: createDefault() };
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
        } catch (error: any) {
            errors.push(error);
        } finally {
            for (const iterator of iterators) {
                try {
                    await iterator.return();
                } catch (error: any) {
                    errors.push(error);
                }
            }
            if (errors.length === 1) {
                // eslint-disable-next-line no-unsafe-finally
                throw errors[0];
            } else if (errors.length > 1) {
                // eslint-disable-next-line no-unsafe-finally
                throw new AggregateError(errors);
            }
        }
    },
);

export { zipLongest as default };
