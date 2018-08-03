### `flatMap`

###### sync

```ts
function flatMap<In, Out>(
    iterable: Iterable<In>,
    mapper: (item: In, index: number) =>  Iterable<Out>,
): Iterable<Out>

function flatMap<In, Out>(
    iterable: Iterable<In>,
    allowNonIterableReturn: boolean,
    mapper: (item: In, index: number) => Iterable<Out> | Out,
): Iterable<Out>

function flatMap(iterable, mapper)
function flatMap(iterable, allowNonIterableReturn, mapper)
```

###### async

```ts
function flatMap<In, Out>(
    asyncIterable: AsyncOrSyncIterable<In>,
    mapper: (item: In, index: number) => Promise<AsyncOrSyncIterable<Out>> | AsyncOrSyncIterable<Out>,
): AsyncIterable<Out>

function flatMap<In, Out>(
    asyncIterable: AsyncOrSyncIterable<In>,
    allowNonIterableReturn: boolean,
    mapper: (item: In, index: number) => Promise<AsyncOrSyncIterable<Out>|Out> | AsyncOrSyncIterable<Out> | Out,
): Iterable<Out>

function flatMap(asyncIterable, mapper)
function flatMap(asyncIterable, allowNonIterableReturn, mapper)
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
