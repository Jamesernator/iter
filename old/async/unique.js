import create from "./createIterableMethod.js"

/* uniq yields a sequence of values in the order given but will only
   emit each element once,
   optionally takes an iteratee function and a Set-like object which to use
   WARNING: this function uses a Set to keep track of items so may consume
   memory as large as the length of the iterable
*/
export default create(async function* uniq(iteratee=item => item, seen=new Set()) {
    let idx = 0
    for await (const item of this) {
        const key = await iteratee(item, idx, this.target)
        if (!seen.has(key)) {
            seen.add(key)
            yield item
        }
        idx += 1
    }
    return this.final
})
