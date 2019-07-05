
export function deepEqual<T>(a: T, b: T): boolean {
    const seen = new Set()

    function deepEqualRecursive(a: T, b: T): boolean {
        if (seen.has(a)) {
            throw new TypeError("Circular objects not supported")
        }
        if (a === undefined) {
            return b === undefined;
        } else if (a === null) {
            return b === null;
        } else if (typeof a === 'number'
        || typeof a === 'string'
        || typeof a === 'boolean'
        || typeof a === 'bigint'
        || typeof a === 'symbol') {
            return Object.is(a, b)
        } else if (Array.isArray(a)) {
            seen.add(a)
            return Array.isArray(b)
                && a.length === b.length
                && a.every((item, index) => item === b[index])
        } else if (Object.getPrototypeOf(a) === null
        || Object.getPrototypeOf(a) === Object.prototype) {
            seen.add(a)
            return typeof b === 'object'
                && Object.keys(a).length === Object.keys(b).length
                && Object.entries(a).every(([item, index]) => item === (b as any)[index])
        }
        throw new TypeError("Can't use deepEqual on value")
    }

    return deepEqualRecursive(a, b)
}
