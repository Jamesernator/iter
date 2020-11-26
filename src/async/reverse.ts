import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";
import toArray from "./toArray.js";

const reverse = iterableGenerator(
    async function* reverse<T>(
        iterable: AsyncOrSyncIterable<T>,
    ): AsyncGenerator<T> {
        const arr = await toArray(iterable);
        yield* arr.reverse() as unknown as AsyncGenerator<T>;
    },
);

export { reverse as default };
