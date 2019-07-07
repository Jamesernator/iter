import enumerate from "./enumerate.js";

export default function findIndex<T>(
    iterable: Iterable<T>,
): number | undefined;
export default function findIndex<T>(
    iterable: Iterable<T>,
    predicate: ((value: T, index: number) => any),
): number | undefined;
export default function findIndex<T, Default>(
    iterable: Iterable<T>,
    defaultValue: Default,
    predicate: ((value: T, index: number) => any),
): Default | number;
export default function findIndex<T>(
    iterable: Iterable<T>,
    ...options:
    []
    | [((value: T, index: number) => any)]
    | [number, ((value: T, index: number) => any)]
) {
    let predicate: (value: T, index: number) => any;
    let hasDefault: boolean = false;
    let defaultValue: number;

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

    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            return idx;
        }
    }

    if (hasDefault) {
        return defaultValue!;
    }
    throw new Error(`[find] No item found with no default provided`);
}
