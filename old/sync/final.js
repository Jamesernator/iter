import create from "./createMethod.js"

/* final returns the done value of the iterable skipping all other values */
export default create([],
    function final() {
        for (const _ of this) {
            /* consume the iterator */
        }
        return this.final
    }
)
