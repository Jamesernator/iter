import portable from "./#portable.js"

function isIterable(maybeIterable) {
    return maybeIterable != null
        && typeof maybeIterable[Symbol.iterator] === 'function'
}

export default portable(isIterable)

export { isIterable as raw }
