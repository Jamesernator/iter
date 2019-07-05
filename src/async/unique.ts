import iterableGenerator from "./iterableGenerator.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

type SetLike<T> = {
    add(item: T): void,
    has(item: T): any,
};

const unique = iterableGenerator(
    async function* unique<T>(
        iterable: AsyncOrSyncIterable<T>,
        makeSet: () => SetLike<T> = () => new Set(),
    ) {
        const set = makeSet();
        for await (const item of iterable) {
            if (!set.has(item)) {
                set.add(item);
                yield item;
            }
        }
    },
);

export { unique as default };
