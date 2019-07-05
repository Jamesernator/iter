
export default function toMap<K, V>(iterable: Iterable<[K, V]>) {
    const m: Map<K, V> = new Map();
    for (const item of iterable) {
        const [key, value] = item;
        m.set(key, value);
    }
    return m;
}
