
export default function named<A extends Array<any>, R>(
    name: string,
    func: (...args: A) => R,
): (...args: A) => R {
    Object.defineProperty(func, "name", { value: name });
    return func;
}
