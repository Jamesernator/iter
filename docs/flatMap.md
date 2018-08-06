### `flatMap`

###### sync

```ts
function flatMap<T, S>(
    iterable: Iterable<T>,
    mapper: (item: T, index: number) => Iterable<S>,
): Iterable<S>

function flatMap<T, S>(
    iterable: Iterable<T>,
    allowNonIterableReturn: false,
    mapper: (item: T, index: number) => Iterable<S>,
): Iterable<S>

function flatMap<T, S>(
    iterable: Iterable<T>,
    allowNonIterableReturn: true,
    mapper: (item: T, index: number) => S | Iterable<S>,
): Iterable<S>
```

###### async

```ts
function flatMap<T, S>(
    asyncIterable: AsyncOrSyncIterable<T>,
    mapper: (item: T, index: number) => AsyncOrSyncIterable<S> | Promise<AsyncOrSyncIterable<S>>,
): AsyncIterable<S>

function flatMap<T, S>(
    asyncIterable: AsyncOrSyncIterable<T>,
    allowNonIterableReturn: false,
    mapper: (item: T, index: number) => AsyncOrSyncIterable<S> | Promise<AsyncOrSyncIterable<S>>,
): AsyncIterable<S>

function flatMap<T, S>(
    asyncIterable: AsyncOrSyncIterable<T>,
    allowNonIterableReturn: true,
    mapper: (item: T, index: number) => S | AsyncOrSyncIterable<S> | Promise<AsyncOrSyncIterable<S>>
): AsyncIterable<S>
```

The `flatMap` function takes an iterable of any items and passes each item to the `mapper` function.
The resulting iterable is equivalent to concatenating all the results of applying the `mapper` to each item.

If `allowNonIterableReturn` is `true` then we also allow the `mapper` function to return a non-iterable which will be treated
as if it were in an iterable of just itself.

```js
import flatMap from '@jx/iter/sync/flatMap.mjs'

flatMap([1, 2, 3, 4], x => [x, x**2, x**3])
// [1, 1, 1, 2, 4, 8, 3, 9, 27, 4, 16, 64]

Array.from(flatMap([1, 2, 3, 4], x => x**2))
// throws Error("1 is not iterable")

// allowNonIterableReturn
flatMap([1, 2, 3, 4], true, x => x % 2 === 0 ? [x, x**2] : x)
// [1, 2, 4, 3, 4, 16]
```
