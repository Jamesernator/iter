### `findLastIndex`

###### sync

```ts
function findLastIndex<T>(
    iterable: Iterable<T>,
): number

function findLastIndex<T>(
    iterable: Iterable<T>,
    predicate: (item: T, index: number) => any,
): number

function findLastIndex<T, Default>(
    iterable: Iterable<T>,
    defaultValue: Default,
    predicate: (item: T, index: number) => any,
): number | Default
```

###### async
```ts
function findLastIndex<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<number>

function findLastIndex<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate: (item: T, index: number) => any,
): Promise<number>

function findLastIndex<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    defaultValue: number,
    predicate: (item: T, index: number) => any,
): Promise<number>
```

The `findLastIndex` function returns the last index in the iterable for which the predicate function returns a truthy value.
If the item is not found and a `defaultValue` is provided then it will return the `defaultValue`, otherwise if an item is not
found and no default is provided an `Error` will be thrown.

```js
import findLastIndex from '@jx/iter/sync/findLastIndex.mjs'

findLastIndex([{ x: 10, y: 20 }, { x: 20, y: 20 }, { x: 30, y: 40 }, { x: 0, y: 0 }], ({ x, y }) => x + y >= 40)
// 2

findLastIndex([{ x: 10, y: 20 }, { x: 20, y: 20 }], ({ x, y }) => x + y >= 9000)
// -> throws Error('not found')

findLastIndex([1, 2, 3, 4, 5, 6], -1, i => i % 100 === 0)
// -1 // The default value

```
