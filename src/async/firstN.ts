import type { AsyncOrSyncIterable } from "../lib/AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";

export default async function firstN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 0,
    allowShorter?: boolean,
): Promise<[]>;
export default async function firstN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 1,
    allowShorter?: false,
): Promise<[T]>;
export default async function firstN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 2,
    allowShorter?: false,
): Promise<[T, T]>;
export default async function firstN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 3,
    allowShorter?: false,
): Promise<[T, T, T]>;
export default async function firstN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: 4,
    allowShorter?: false,
): Promise<[T, T, T, T]>;
export default async function firstN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: number,
    allowShorter?: boolean,
): Promise<Array<T>>;
export default async function firstN<T>(
    iterable: AsyncOrSyncIterable<T>,
    n: number,
    allowShorter=false,
): Promise<Array<T>> {
    const buff = [];
    for await (const [idx, item] of enumerate(iterable)) {
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

