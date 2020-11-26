import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";

export default async function sampleN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 0,
    allowShorter?: boolean,
): Promise<[]>;
export default async function sampleN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 1,
    allowShorter?: false,
): Promise<[T]>;
export default async function sampleN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 2,
    allowShorter?: false,
): Promise<[T, T]>;
export default async function sampleN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 3,
    allowShorter?: false,
): Promise<[T, T, T]>;
export default async function sampleN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 4,
    allowShorter?: false,
): Promise<[T, T, T, T]>;
export default async function sampleN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: number,
    allowShorter?: boolean,
): Promise<Array<T>>;
export default async function sampleN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: number,
    allowLess=false,
): Promise<Array<T>> {
    const chosenList: Array<T> = [];
    for await (const [idx, item] of enumerate(iterable)) {
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

