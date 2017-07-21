import create from "./createMethod.js"

/* countBy returns a Map like object that maps the values of iteratee
   to the count of values for the returned key,
   optionally an existing Map-like object may be provided
*/
const pattern = [
    'function??',
    ['undefined', { // set-like
        has: 'function',
        set: 'function',
        get: 'function',
    }]
]

export default create(pattern,
    function countBy(iteratee, map=new Map()) {
        const _iteratee = iteratee != null ? iteratee : x => x
        let idx = 0
        for (const item of this) {
            const key = _iteratee(item, idx, this.target)
            if (!map.has(key)) {
                map.set(key, 0)
            }
            map.set(key, map.get(key) + 1)
            idx += 1
        }
        return map
    }
)
