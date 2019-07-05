import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

const reject = iterableGenerator(
    async function* reject<T>(
        iterable: AsyncOrSyncIterable<T>,
        predicate: ((value: T, index: number) => any),
    ) {
        for await (const [idx, item] of enumerate(iterable)) {
            if (!await predicate(item, idx)) {
                yield item;
            }
        }
    },
);

export { reject as default };

