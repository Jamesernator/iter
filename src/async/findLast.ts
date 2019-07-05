import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";

export default function findLast<T>(
    iterable: AsyncOrSyncIterable<T>,
): Promise<T | undefined>;
export default function findLast<T>(
    iterable: AsyncOrSyncIterable<T>,
    predicate: ((value: T, index: number) => any),
): Promise<T | undefined>;
export default function findLast<T, Default=T>(
    iterable: AsyncOrSyncIterable<T>,
    defaultValue: Default,
    predicate: ((value: T, index: number) => any),
): Promise<T | Default>;
export default async function findLast<T, Default=T>(
    iterable: AsyncOrSyncIterable<T>,
    ...options:
    []
    | [((value: T, index: number) => any)]
    | [Default, ((value: T, index: number) => any)]
) {
    let predicate: (value: T, index: number) => any;
    let hasDefault: boolean = false;
    let defaultValue: Default;

    if (options.length === 0) {
        predicate = (i) => i;
        hasDefault = false;
    } else if (options.length === 1) {
        predicate = options[0];
        hasDefault = false;
    } else {
        predicate = options[1];
        defaultValue = options[0];
        hasDefault = true;
    }

    let found = false;
    let foundItem: T;

    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            found = true;
            foundItem = item;
        }
    }
    if (found) {
        return foundItem!;
    } else if (hasDefault) {
        return defaultValue!;
    }
    throw new Error(`[find] No item found with no default provided`);
}
