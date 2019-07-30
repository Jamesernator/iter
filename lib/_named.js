export default function named(name, func) {
    Object.defineProperty(func, "name", { value: name });
    return func;
}
//# sourceMappingURL=_named.js.map