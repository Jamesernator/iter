import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable.js";
import enumerate from "./enumerate.js";

export default async function firstN<T, N extends number>(
    iterable: AsyncOrSyncIterable<T>,
    n: N,
    allowShorter=false,
) {
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

