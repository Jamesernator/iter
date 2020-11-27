
export default function length<T>(
    iterable: Iterable<T>,
): number {
    let i = 0;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    for (const _ of iterable) {
        i += 1;
    }
    return i;
}
