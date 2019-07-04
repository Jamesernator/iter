import iterableGenerator from "./iterableGenerator.js"

export default iterableGenerator(
    function* enumerate<T>(iterable: Iterable<T>) {
        let idx = 0
        for (const item of iterable) {
            yield [idx, item] as const
            idx += 1
        }
    }
)
