import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

type Unwrap<T> = T extends Iterable<infer R> ? R : never;
type ZipUnwrapped<T> = { [P in keyof T]: Unwrap<T[P]> };

const zip = iterableGenerator(
    function* zip<
        Iterables extends Array<Iterable<any>> | [Iterable<any>],
    >(
        iterables: Iterables,
    ): Generator<ZipUnwrapped<Iterables>, void> {
        const iteratorsDone = new Set();
        const iterators: Array<Generator<any, void>> = [];
        const errors: Array<any> = [];
        try {
            for (const iterable of iterables as any) {
                iterators.push(iterator(iterable) as any);
            }

            while (true) {
                const nexts = iterators.map((iterator) => {
                    if (iteratorsDone.has(iterator)) {
                        return { done: true, value: undefined };
                    }
                    const result = iterator.next();
                    if (result.done) {
                        iteratorsDone.add(iterator);
                    }
                    return result;
                });
                if (nexts.some(({ done }) => done)) {
                    return;
                }
                yield nexts.map(({ value }) => value) as unknown as ZipUnwrapped<Iterables>;
            }
        } catch (error: any) {
            errors.push(error);
        } finally {
            for (const iterator of iterators) {
                try {
                    iterator.return();
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

export { zip as default };
