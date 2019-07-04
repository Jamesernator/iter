
export default function lastN<T>(
  iterable: Iterable<T>,
  n: number,
  allowShorter=false,
) {
    const buff = []
    for await (const item of iterable) {
        buff.push(item)
        if (buff.length > n) {
            buff.shift()
        }
    }
    if (buff.length === n) {
        return buff
    } else if (allowShorter) {
        return buff
    } else {
        throw new Error(`[lastN] Iterable not long enough to get last ${ n }`)
    }
}
