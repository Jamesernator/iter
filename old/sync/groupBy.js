import create from "./createMethod.js"

/* groupBy reduces a sequence into a Map object where each key is
    determined by what iteratee returns,
    optionally a Map like type may be provided and will be used instead
    of ES6 map
*/
const mapLike = {
    get: 'function',
    set: 'function',
    has: 'function',
}
export default create(['function?', ['undefined', mapLike]],
    function groupBy(iteratee=item => item, map=new Map()) {
        let idx = 0
        for (const item of this) {
            const group = iteratee(item, idx, this.target)
            if (map.has(group)) {
                map.get(group).push(item)
            } else {
                map.set(group, [item])
            }

            idx += 1
        }
        return map
    }
)
