import create from "./createMethod.js"

/* indexBy returns a Map like object that maps the values of iteratee
   to the value of the item,
   optionally an existing Map-like object may be passed in to be filled
*/
const mapLike = {
    get: 'function',
    has: 'function',
    set: 'function',
}

export default create(['function?', ['undefined', mapLike]],
    function indexBy(iteratee=item => item, map=new Map()) {
        let idx = 0
        for (const item of this) {
            const key = iteratee(item, idx, this.target)
            map.set(key, item)
            idx += 1
        }
        return map
    }
)
