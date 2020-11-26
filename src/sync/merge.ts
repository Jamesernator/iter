import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

function racePromises<T>(object: Record<string, Promise<T>>) {
    const promises = Object.entries(object).map(([key, promise]) => {
        return Promise.resolve(promise).then((value) => {
            return { key, value };
        });
    });
    return Promise.race(promises);
}

function mapObject<T, R>(
    object: Record<string, T>,
    mapperFn: (value: T, key: string) => R,
): Record<string, R> {
    const result: Record<string, R> = {};
    for (const [key, value] of Object.entries(object)) {
        result[key] = mapperFn(value, key);
    }
    return result;
}

const merge = iterableGenerator(
    async function* merge<T>(
        iterables: Array<AsyncOrSyncIterable<T>>,
    ): AsyncGenerator<T> {
        const iterators: Record<string, AsyncGenerator<T, void>> = {};
        const errors: Array<any> = [];
        try {
            for (const [idx, item] of iterables.entries()) {
                iterators[idx] = iterator(item);
            }
            const waiting = mapObject(iterators, (i) => i.next());
            while (Object.keys(iterators).length > 0) {
                const { key, value: res } = await racePromises(waiting);
                if (res.done) {
                    delete iterators[key];
                } else {
                    yield res.value;
                    waiting[key] = iterators[key].next();
                }
            }
        } catch (err: any) {
            errors.push(err);
        }

        for (const iterator of Object.values(iterators)) {
            try {
                await iterator.return();
            } catch (err: any) {
                errors.push(err);
            }
        }
        if (errors.length === 1) {
            throw errors[0];
        } else if (errors.length > 1) {
            throw new AggregateError(errors);
        }
    },
);

export { merge as default };
