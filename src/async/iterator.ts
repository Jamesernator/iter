type AsyncOrSyncIterable = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable;

/**
 * this is a tiny utility so that calling .return is idempotent and can be
 * called multiple times while only calling .return on the source iterable
 * once
 */
export default async function* iterator<T>(iterable: AsyncOrSyncIterable<T>) {
    yield* iterable;
}
