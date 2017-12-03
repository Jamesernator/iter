import named from "../--named.mjs"
import assert from "../--assert.mjs"

function _iterableGenerator(genFunc) {
    return named(genFunc.name, function(...args) {
        return {
            [Symbol.asyncIterator]: _ => {
                return Reflect.apply(genFunc, this, args)
            },
        }
    })
}

function iterableGenerator(genFunc, ...rest) {
    assert.function(genFunc, `[iterableGenerator] Argument to iterableGenerator must be a function`)
    assert.empty(rest, `[iterableGenerator] Unexpected arguments to iterableGenerator`)
    return _iterableGenerator(genFunc)
}

export default iterableGenerator

export { _iterableGenerator as raw }
