import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

type Unwrap<T> = T extends AsyncOrSyncIterable<infer R> ? R : never;
type ZipUnwrapped<T> = { [P in keyof T]: Unwrap<T[P]> };

const zip = iterableGenerator(
    async function* zip<
        Iterables extends Array<AsyncOrSyncIterable<any>> | [AsyncOrSyncIterable<any>],
    >(
        iterables: Iterables,
    ): AsyncGenerator<ZipUnwrapped<Iterables>, void> {
        const iteratorsDone = new Set();
        const iterators: Array<AsyncGenerator<any, void>> = [];
        const errors: Array<any> = [];
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
        } catch (error: any) {
            errors.push(error);
        }
        for (const iterator of iterators) {
            try {
                await iterator.return();
            } catch (error: any) {
                errors.push(error);
            }
        }
        if (errors.length === 1) {
            throw errors[0];
        } else if (errors.length > 1) {
            throw new AggregateError(errors);
        }
    },
);

export { zip as default };
