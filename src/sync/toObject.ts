
export default function toObject<V>(
    iterable: Iterable<[string, V]>,
) {
    const o: { [key: string]: V } = Object.create(null);
    for (const [key, value] of iterable) {
        o[key] = value;
    }
    return o;
}
