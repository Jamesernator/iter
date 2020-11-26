import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";

export default async function sampleOne<T>(
    iterable: AsyncOrSyncIterable<T>,
): Promise<T> {
    let chosen: T;
    let chosenSet = false;
    for await (const [idx, item] of enumerate(iterable)) {
        if (Math.random() < 1/(idx + 1)) {
            chosen = item;
            chosenSet = true;
        }
    }
    if (chosenSet) {
        return chosen!;
    }
    throw new Error(`[sampleOne] Can't pick sample element from empty sequence`);
}
