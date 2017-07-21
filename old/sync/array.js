import create from "./createMethod.js"

/* This function simply converts an iterable into an Array */
export default create([],
    function array() {
        return Array.from(this)
    }
)
