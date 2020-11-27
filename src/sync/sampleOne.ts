import enumerate from "./enumerate.js";

export default function sampleOne<T>(
    iterable: Iterable<T>,
): T {
    let chosen: T;
    let chosenSet = false;
    for (const [idx, item] of enumerate(iterable)) {
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
