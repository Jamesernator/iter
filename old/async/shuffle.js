import create from "./createIterableMethod.js"
import array from "./array.js"

/* shuffle takes an iterable and yields the values from the iterable in
    a random order
*/

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

export default create(async function* shuffle() {
    const arr = await array(this)
    for (let i=0; i < arr.length; i++) {
        const j = randomInteger(i, arr.length)
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        yield arr[i]
    }
})
