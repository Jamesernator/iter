import { AsyncOrSyncIterable } from "../AsyncOrSyncIterable";

export default
    function reduce(
        asyncIterable: AsyncOrSyncIterable<string>,
    ): Promise<string>

export default
    function reduce(
        asyncIterable: AsyncOrSyncIterable<number>,
    ): Promise<number>


export default
    function reduce<Item, Result>(
        asyncIterable: AsyncOrSyncIterable<Item>,
        reducer: (acc: Result, item: Item, index: number) => Result | Promise<Result>,
    ): Promise<Result>

export default
    function reduce<Item, Result>(
        asyncIterable: AsyncOrSyncIterable<Item>,
        seedValue: Result,
        reducer: (acc: Result, item: Item, index: number) => Result | Promise<Result>,
    ): Promise<Result>