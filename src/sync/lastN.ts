
export default function lastN<T>(
    iterable: Iterable<T>,
    n: 0,
    allowShorter?: boolean,
): [];
export default function lastN<T>(
    iterable: Iterable<T>,
    n: 1,
    allowShorter?: false,
): [T];
export default function lastN<T>(
    iterable: Iterable<T>,
    n: 2,
    allowShorter?: false,
): [T, T];
export default function lastN<T>(
    iterable: Iterable<T>,
    n: 3,
    allowShorter?: false,
): [T, T, T];
export default function lastN<T>(
    iterable: Iterable<T>,
    n: 4,
    allowShorter?: false,
): [T, T, T, T];
export default function lastN<T>(
    iterable: Iterable<T>,
    n: number,
    allowShorter?: boolean,
): Array<T>;
export default function lastN<T>(
    iterable: Iterable<T>,
    n: number,
    allowShorter=false,
): Array<T> {
    const buff = [];
    for (const item of iterable) {
        buff.push(item);
        if (buff.length > n) {
            buff.shift();
        }
    }
    if (buff.length === n) {
        return buff;
    } else if (allowShorter) {
        return buff;
    }
    throw new Error(`[lastN] Iterable not long enough to get last ${ n }`);
}
