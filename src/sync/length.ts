
export default function length<T>(iterable: Iterable<T>) {
    let i = 0;
    for (const _ of iterable) {
        i += 1;
    }
    return i;
}
