import iterableGenerator from "./iterableGenerator.js";

type SetLike<T> = {
    add(item: T): void,
    has(item: T): any,
}

export default iterableGenerator(
    function* unique<T>(
        iterable: Iterable<T>,
        makeSet: () => SetLike<T> = () => new Set()
    ) {
        const set = makeSet()
        for (const item of iterable) {
            if (!set.has(item)) {
                set.add(item)
                yield item
            }
        }
    }
)
