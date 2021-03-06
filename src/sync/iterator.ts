
/**
 * this is a tiny utility so that calling .return is idempotent and can be
 * called multiple times while only calling .return on the source iterable
 * once
 */
export default function* iterator<T>(
    iterable: Iterable<T>,
): Generator<T, void, void> {
    yield* iterable as Generator<T>;
}
