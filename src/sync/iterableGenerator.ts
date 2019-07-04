import named from "../--named.js"

export default function iterableGenerator<A extends Array<any>, T>(
    genFunc: (...args: A) => Iterator<T>
): (...args: A) => Iterable<T> {
    return named(genFunc.name, function(...args: A) {
        return {
            [Symbol.iterator]: () => {
                return genFunc(...args)
            },
        }
    })
}
