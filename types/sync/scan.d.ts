
export default
    function scan<Item, Result>(
        iterable: Iterable<Item>,
        reducer: (acc: Result, item: Item, index: number) => Result,
    ): Iterable<Result>

export default
    function scan<Item, Result>(
        iterable: Iterable<Item>,
        seedValue: Result,
        reducer: (acc: Result, item: Item, index: number) => Result,
    ): Iterable<Result>
