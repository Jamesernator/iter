import { AsyncOrSyncIterable } from "../../types/AsyncOrSyncIterable";

export default
    function scan(
        asyncIterable: AsyncOrSyncIterable<string>,
    ): AsyncIterable<string>

export default
    function scan(
        asyncIterable: AsyncOrSyncIterable<number>,
    ): AsyncIterable<number>


export default
    function scan<Item, Result>(
        asyncIterable: AsyncOrSyncIterable<Item>,
        reducer: (acc: Result, item: Item, index: number) => Result | Promise<Result>,
    ): AsyncIterable<Result>

export default
    function scan<Item, Result>(
        asyncIterable: AsyncOrSyncIterable<Item>,
        seedValue: Result,
        reducer: (acc: Result, item: Item, index: number) => Result | Promise<Result>,
    ): AsyncIterable<Result>