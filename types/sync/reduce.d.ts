
export default
    function reduce(
        iterable: Iterable<string>,
    ): string

export default
    function reduce(
        iterable: Iterable<number>,
    ): number


export default
    function reduce<Item, Result>(
        iterable: Iterable<Item>,
        reducer: (acc: Result, item: Item, index: number) => Result,
    ): Result

export default
    function reduce<Item, Result>(
        iterable: Iterable<Item>,
        seedValue: Result,
        reducer: (acc: Result, item: Item, index: number) => Result,
    ): Result