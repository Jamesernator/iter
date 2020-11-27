import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

type Unwrap<T> = T extends Iterable<infer R> ? R : never;
type ZipUnwrapped<T, Default=undefined> = {
    [P in keyof T]: Unwrap<T[P]> | Default
};

const zipLongest = iterableGenerator(
    function* zipLongest<
        Iterables extends Array<Iterable<any>> | [Iterable<any>],
        Default=undefined,
    >(
        iterables: Iterables,
        createDefault: () => Default=() => undefined as unknown as Default,
    ): Generator<ZipUnwrapped<Iterables>> {
        const iteratorsDone = new Set();
        const iterators: Array<any> = [];
        const errors: Array<any> = [];
        try {
            for (const iterable of iterables) {
                iterators.push(iterator(iterable));
            }

            while (true) {
                const nexts = iterators.map((iterator) => {
                    if (iteratorsDone.has(iterator)) {
                        return { done: true, value: createDefault() };
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

export { zipLongest as default };
