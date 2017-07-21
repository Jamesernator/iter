import create from "./createMethod.js"

/* indexBy returns a Map like object that maps the values of iteratee
   to the value of the item,
   optionally an existing Map-like object may be passed in to be filled
*/
export default create(async function indexBy(iteratee=item => item, map=new Map()) {
    let idx = 0
    for await (const item of this) {
        const key = await iteratee(item, idx, this.target)
        map.set(key, item)
        idx += 1
    }
    return map
})
