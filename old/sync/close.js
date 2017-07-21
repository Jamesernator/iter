import create from "./createMethod.js"

/* This function causes an iterator to immediately close regardless of
    the current state
*/
export default create(function close(...args) {
    if (this.return instanceof Function) {
        const res = this.return(...args)
        if (!res.done) {
            throw new Error("Iterator didn't close")
        } else {
            return res.value
        }
    }
})
