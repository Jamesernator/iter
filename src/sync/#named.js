
export default function named(name, func) {
    Object.defineProperty(func, 'name', { value: name })
    return func
}
