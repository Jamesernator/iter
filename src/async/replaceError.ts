import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import iterableGenerator from "./iterableGenerator.js";

const replaceError = iterableGenerator(
    async function* replaceError<T>(
        iterable: AsyncOrSyncIterable<T>,
        replacer: (error: any) => AsyncOrSyncIterable<T> | Promise<AsyncOrSyncIterable<T>>,
    ): AsyncGenerator<T> {
        try {
            yield* iterable as AsyncGenerator<T>;
        } catch (err: any) {
            yield* await replacer(err) as AsyncGenerator<T>;
        }
    },
);

export { replaceError as default };
