
export default function contains<T>(
    iterable: Iterable<T>,
    value: T,
    isEqual: ((value1: T, value2: T) => any)=Object.is,
) {
    for (const item of iterable) {
        if (isEqual(value, item)) {
            return true
        }
    }
    return false
}
