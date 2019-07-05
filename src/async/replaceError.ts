import iterableGenerator from "./iterableGenerator.js";

type AsyncOrSyncIterable<T> = import("../lib/AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

const replaceError = iterableGenerator(
    async function* replaceError<T>(
        iterable: AsyncOrSyncIterable<T>,
        replacer: (error: any) => AsyncOrSyncIterable<T> | Promise<AsyncOrSyncIterable<T>>,
    ) {
        try {
            yield* iterable;
        } catch (err) {
            yield* await replacer(err);
        }
    },
);

export { replaceError as default };
