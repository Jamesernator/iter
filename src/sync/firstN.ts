import enumerate from "./enumerate.js";

export default function firstN<T, N extends number>(
    iterable: Iterable<T>,
    n: N,
    allowShorter=false,
) {
    const buff = []
    for (const [idx, item] of enumerate(iterable)) {
        if (idx === n) {
            break
        }
        buff.push(item)
    }
    if (buff.length === n) {
        return buff
    } else if (allowShorter) {
        return buff
    } else {
        throw new Error(`[firstN] Iterable not long enough to get first ${ n }`)
    }
}

