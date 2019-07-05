type AsyncOrSyncIterable = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable;
import iterableGenerator from "./iterableGenerator.js";

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
