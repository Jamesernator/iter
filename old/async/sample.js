import create from "./createMethod.js"
/* sample takes n randomly chosen elements from a given sequence
    and returns them as an array if n is provided otherwise a single
    item is returned
*/
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

/* eslint-disable complexity */
const singleSample = create(async function singleSample(..._default) {
    const { value: _first, done } = await this.next()
    if (done) {
        if (_default.length === 0) {
            throw new Error("Tried to sample empty sequence")
        } else {
            return _default[0]
        }
    }
    let choice = _first
    let idx = 1
    for await (const item of this) {
        if (randomInteger(0, idx+1) === 0) {
            choice = item
        }
        idx += 1
    }
    return choice
})
/* eslint-enable complexity */

const multiSample = create(async function multiSample(n) {
    const choices = []
    let idx = 0
    for await (const item of this) {
        if (choices.length < n) {
            choices.push(item)
        } else if (randomInteger(0, idx+1) < n) {
            choices[randomInteger(0, n)] = item
        }
        idx += 1
    }
    return choices
})

export default create(async function sample(n='single', ...opt) {
    if (n === 'single' || n == null) {
        return await singleSample(this, ...opt)
    } else {
        const [enforceLength=true] = opt
        const _sample = await multiSample(this, n)
        if (enforceLength && _sample.length !== n) {
            throw new Error(
                `Request sample of size ${n} but got only ${_sample.length}`
            )
        }
        return _sample
    }
})
