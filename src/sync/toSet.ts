
export default function toSet<T>(iterable: Iterable<T>) {
    const s: Set<T> = new Set();
    for (const item of iterable) {
        s.add(item);
    }
    return s;
}
