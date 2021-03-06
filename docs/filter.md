
### `filter`

###### sync

```ts
function filter<T, K extends T>(
    iterable: Iterable<T>,
    predicate?: (item: T, index: number) => item is K,
): Iterable<K>

function filter<T>(
    iterable: Iterable<T>,
    predicate?: (item: T, index: number) => any,
): Iterable<T>
```

###### async

```ts
function filter<T, K extends T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate?: (item: T, index: number) => item is K,
): AsyncIterable<K>

function filter<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate?: (item: T, index: number) => any | Promise<any>,
): AsyncIterable<T>
```

The `filter` function creates a new iterable that emits all items for which the predicate function returns `true`. The predicate function will be passed both the item and index.

```js
import filter from '@jx/iter/sync/filter.mjs'

Array.from(filter([1,2,3,4,5,6,7], x => x % 3 > 2))
// [1, 2, 4, 5, 7]

Array.from(filter([1,2,3,4,5,6], (_, index) => index > 3))
// [5, 6]

// default predicate is simply if the item is truthy
Array.from(filter([0,1,2]))
// [1,2]
```
