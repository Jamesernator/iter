import named from "../lib/_named.js";

export default function iterableGenerator<A extends Array<any>, T>(
    genFunc: (...args: A) => Iterator<T>,
): (...args: A) => Iterable<T> {
    return named(genFunc.name, (...args: A) => {
        return {
            [Symbol.iterator]: () => {
                return genFunc(...args);
            },
        };
    });
}
