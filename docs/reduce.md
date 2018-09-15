### `reduce`

### sync

```ts
function reduce<Item, Result>(
    iterable: Iterable<Item>,
    reducer: (acc: Result, item: Item, index: number) => Result,
): Result

function reduce<Item, Result>(
    iterable: Iterable<Item>,
    seedValue: Result,
    reducer: (acc: Result, item: Item, index: number) => Result,
): Result
```

### async

```ts
function reduce<Item, Result>(
    asyncIterable: AsyncOrSyncIterable<Item>,
    reducer: (acc: Result, item: Item, index: number) => Result | Promise<Result>,
): Promise<Result>

function reduce<Item, Result>(
    asyncIterable: AsyncOrSyncIterable<Item>,
    seedValue: Result,
    reducer: (acc: Result, item: Item, index: number) => Result | Promise<Result>,
): Promise<Result>
```

The `reduce` function reduces an iterable into a single value by passing the last
return value of the `reducer` function with the next item of the `iterable`.
For the first call this first argument is the `seedValue` if provided otherwise
it is the first value of the iterable and the first value will never be the second
value of the `reducer`. Whatever the final returned value of the `reducer` function
is what the return value will be.

If `reduce` is passed an empty iterable then it will return the `seedValue`, if no seed value is provided then an error will be thrown.

```js
reduce([1,2,3,4], (a, b) => a + b)
// 10

reduce(['foo', 'bar', 'bazbar'], 0, (totalLength, str) => totalLength + str.length)
// 12

reduce([], _ => 'banana')
// -> throws Error as no seed is provided and sequence is empty
```
