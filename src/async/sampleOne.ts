import enumerate from "./enumerate.js";

type AsyncOrSyncIterable<T> = import("../AsyncOrSyncIterable.js").AsyncOrSyncIterable<T>;

export default async function sampleOne<T>(iterable: AsyncOrSyncIterable<T>) {
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
