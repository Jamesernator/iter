import iterableGenerator from "./iterableGenerator.js";
import iterator from "./iterator.js";

type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

function racePromises<T>(object: { [key: string]: Promise<T> }) {
    const promises = Object.entries(object).map(([key, promise]) => {
        return Promise.resolve(promise).then((value) => {
            return { key, value };
        });
    });
    return Promise.race(promises);
}

function mapObject<T, R>(
    object: { [key: string]: T },
    mapperFn: (value: T, key: string) => R,
): { [key: string]: R } {
    const result: { [key: string]: R } = {};
    for (const [key, value] of Object.entries(object)) {
        result[key] = mapperFn(value, key);
    }
    return result;
}

const merge = iterableGenerator(
    async function* merge<T>(iterables: Array<AsyncOrSyncIterable<T>>) {
        const iterators: { [key: string]: AsyncIterableIterator<T> } = {};
        for (const [idx, item] of iterables.entries()) {
            iterators[idx] = iterator(item);
        }
        const waiting = mapObject(iterators, (i) => i.next());
        while (Object.keys(iterators).length > 0) {
            const { key, value: { value, done } } = await racePromises(waiting);
            if (done) {
                delete iterators[key];
            } else {
                yield value;
                waiting[key] = iterators[key].next();
            }
        }
    },
);

export { merge as default };
