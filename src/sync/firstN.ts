import enumerate from "./enumerate.js";

export default function firstN<T>(
    iterable: Iterable<T>,
    n: 0,
    allowShorter?: boolean,
): [];
export default function firstN<T>(
    iterable: Iterable<T>,
    n: 1,
    allowShorter?: false,
): [T];
export default function firstN<T>(
    iterable: Iterable<T>,
    n: 2,
    allowShorter?: false,
): [T, T];
export default function firstN<T>(
    iterable: Iterable<T>,
    n: 3,
    allowShorter?: false,
): [T, T, T];
export default function firstN<T>(
    iterable: Iterable<T>,
    n: 4,
    allowShorter?: false,
): [T, T, T, T];
export default function firstN<T>(
    iterable: Iterable<T>,
    n: number,
    allowShorter?: boolean,
): Array<T>;
export default function firstN<T>(
    iterable: Iterable<T>,
    n: number,
    allowShorter=false,
): Array<T> {
    const buff = [];
    for (const [idx, item] of enumerate(iterable)) {
        if (idx === n) {
            break;
        }
        buff.push(item);
    }
    if (buff.length === n) {
        return buff;
    } else if (allowShorter) {
        return buff;
    }
    throw new Error(`[firstN] Iterable not long enough to get first ${ n }`);
}

