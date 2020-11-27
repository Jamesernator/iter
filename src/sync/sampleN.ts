import enumerate from "./enumerate.js";

export default function sampleN<T>(
    iterable: Iterable<T>,
    n: 0,
    allowShorter?: boolean,
): [];
export default function sampleN<T>(
    iterable: Iterable<T>,
    n: 1,
    allowShorter?: false,
): [T];
export default function sampleN<T>(
    iterable: Iterable<T>,
    n: 2,
    allowShorter?: false,
): [T, T];
export default function sampleN<T>(
    iterable: Iterable<T>,
    n: 3,
    allowShorter?: false,
): [T, T, T];
export default function sampleN<T>(
    iterable: Iterable<T>,
    n: 4,
    allowShorter?: false,
): [T, T, T, T];
export default function sampleN<T>(
    iterable: Iterable<T>,
    n: number,
    allowShorter?: boolean,
): Array<T>;
export default function sampleN<T>(
    iterable: Iterable<T>,
    n: number,
    allowLess=false,
): Array<T> {
    const chosenList: Array<T> = [];
    for (const [idx, item] of enumerate(iterable)) {
        if (idx < n) {
            chosenList.push(item);
        } else if (Math.random() < n/(idx + 1)) {
            const randomN = Math.floor(Math.random() * n);
            chosenList.splice(randomN, 1);
            chosenList.push(item);
        }
    }
    if (chosenList.length === n) {
        return chosenList;
    } else if (allowLess) {
        return chosenList;
    }
    throw new Error(`[sampleN] Can't pick ${ n } elements from ${ chosenList.length } items`);
}

