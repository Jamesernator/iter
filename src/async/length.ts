import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";

export default async function length<T>(
    iterable: AsyncOrSyncIterable<T>,
): Promise<number> {
    let i = 0;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    for await (const _ of iterable) {
        i += 1;
    }
    return i;
}
