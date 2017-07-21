import create from "./createMethod.js"

/* countBy returns a Map like object that maps the values of iteratee
   to the count of values for the returned key,
   optionally an existing Map-like object may be provided
*/
export default create(async function countBy(iteratee=x => x, map=new Map()) {
    let idx = 0
    for await (const item of this) {
        const key = await iteratee(item, idx, this.target)
        if (!map.has(key)) {
            map.set(key, 0)
        }
        map.set(key, map.get(key) + 1)
        idx += 1
    }
    return map
})
