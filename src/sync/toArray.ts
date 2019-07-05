
export default function toArray<T>(iterable: Iterable<T>): Array<T> {
    const result: Array<T> = [];
    for (const item of iterable) {
        result.push(item);
    }
    return result;
}
