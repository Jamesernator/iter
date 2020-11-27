
export default function toObject<V>(
    iterable: Iterable<[string, V]>,
): Record<string, V> {
    const o: Record<string, V> = Object.create(null);
    for (const [key, value] of iterable) {
        o[key] = value;
    }
    return o;
}
