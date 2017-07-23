
export default function iterableGenerator(genFunc) {
    return function(...args) {
        return {
            [Symbol.iterator]() {
                return genFunc(...args)
            }
        }
    }
}
