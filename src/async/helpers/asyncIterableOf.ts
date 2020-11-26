
export default function asyncIterableOf<T>(
    iterable: Iterable<T>,
): AsyncIterable<T> {
    return {
        async* [Symbol.asyncIterator]() {
            yield* iterable;
        },
    };
}
