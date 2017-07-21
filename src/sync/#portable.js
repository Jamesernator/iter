import named from "./#named.js"

export default function portable(func) {
    return named(func.name, function(...args) {
        if (this === undefined) {
            return func(...args)
        } else {
            return func(this, ...args)
        }
    })
}
