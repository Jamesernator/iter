import create from "./createMethod.js"

/* This function causes an iterator to immediately close regardless of
    the current state
*/
export default create(async function close(...args) {
    return this.return(...args).value
})
