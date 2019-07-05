import named from "../--named.js";

export default function iterableGenerator<A extends Array<any>, T>(
    genFunc: (...args: A) => AsyncIterator<T>,
): (...args: A) => AsyncIterable<T> {
    return named(genFunc.name, (...args: A) => {
        return {
            [Symbol.asyncIterator]: () => {
                return genFunc(...args);
            },
        };
    });
}
