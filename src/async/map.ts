import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

const map = iterableGenerator(
    async function* map<T, R>(
        iterable: AsyncOrSyncIterable<T>,
        mapperFn: ((value: T, index: number) => R | Promise<R>),
    ) {
        for await (const [idx, item] of enumerate(iterable)) {
            yield await mapperFn(item, idx);
        }
    },
);

export { map as default };
