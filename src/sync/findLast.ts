import enumerate from "./enumerate.js"

export default function findLast<T>(
    iterable: Iterable<T>,
): T | undefined;
export default function findLast<T>(
    iterable: Iterable<T>,
    predicate: ((value: T, index: number) => any),
): T | undefined;
export default function findLast<T, Default=T>(
    iterable: Iterable<T>,
    defaultValue: Default,
    predicate: ((value: T, index: number) => any),
): T | Default;
export default function findLast<T, Default=T>(
    iterable: Iterable<T>,
    ...options:
        []
        | [((value: T, index: number) => any)]
        | [Default, ((value: T, index: number) => any)]
) {
    let predicate: (value: T, index: number) => any;
    let hasDefault: boolean = false;
    let defaultValue: Default;

    if (options.length === 0) {
        predicate = i => i;
        hasDefault = false;
    } else if (options.length === 1) {
        predicate = options[0];
        hasDefault = false;
    } else {
        predicate = options[1];
        defaultValue = options[0];
        hasDefault = true;
    }

    let found = false
    let foundItem: T;

    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            found = true;
            foundItem = item;
        }
    }
    if (found) {
        return foundItem!
    } else if (hasDefault) {
        return defaultValue!
    } else {
        throw new Error(`[find] No item found with no default provided`)
    }
}
