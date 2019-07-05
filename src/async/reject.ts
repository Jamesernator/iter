import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";
import iterableGenerator from "./iterableGenerator.js";

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

