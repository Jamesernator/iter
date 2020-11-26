
export default function first<T>(
    iterable: Iterable<T>,
): T {
    // eslint-disable-next-line no-unreachable-loop
    for (const item of iterable) {
        return item;
    }
    throw new Error(`[first] Can't get first item of empty sequence`);
}
