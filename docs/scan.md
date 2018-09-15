### `scan`

###### sync

```ts
function scan<Item, Result>(
    iterable: Iterable<Item>,
    reducer: (acc: Result, item: Item, index: number) => Result,
): Iterable<Result>

function scan<Item, Result>(
    iterable: Iterable<Item>,
    seedValue: Result,
    reducer: (acc: Result, item: Item, index: number) => Result,
): Iterable<Result>
```

###### async

```ts
function scan<Item, Result>(
    asyncIterable: AsyncOrSyncIterable<Item>,
    reducer: (acc: Result, item: Item, index: number) => Result | Promise<Result>,
): AsyncIterable<Result>

function scan<Item, Result>(
    asyncIterable: AsyncOrSyncIterable<Item>,
    seedValue: Result,
    reducer: (acc: Result, item: Item, index: number) => Result | Promise<Result>,
): AsyncIterable<Result>
```

The `scan` function is like `reduce` except that it returns an iterable that
emits each step of the reduction rather than just the final value.

```js
Array.from(scan([1,2,3,4,5], (a, b) => a + b))
// [1, 3, 6, 10, 15]

Array.from(scan([], (a, b) => a + b))
// like reduce providing no seed value throws an error on trying to scan
// an empty array, this however is deferred until iteration time

Array.from(scan([1,2,3,4,5], 0, (a, b) => a + b))
// [0, 1, 3, 6, 10, 15]
```
