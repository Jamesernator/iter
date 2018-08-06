### `findIndex`

###### sync

```ts
function findIndex<T>(
    iterable: Iterable<T>,
): number

function findIndex<T>(
    iterable: Iterable<T>,
    predicate: (item: T, index: number) => any,
): number

function findIndex<T, Default>(
    iterable: Iterable<T>,
    defaultValue: Default,
    predicate: (item: T, index: number) => any,
): number | Default
```

###### async
```ts
function findIndex<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<number>

function findIndex<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate: (item: T, index: number) => any | Promise<any>,
): Promise<number>

function findIndex<T, Default>(
    asyncIterable: AsyncOrSyncIterable<T>,
    defaultValue: Default,
    predicate: (item: T, index: number) => any | Promise<any>,
): Promise<number | Default>
```

The `findIndex` function returns the first index in the iterable for which the predicate function returns a truthy value.
If the item is not found and a `defaultValue` is provided then it will return the `defaultValue`, otherwise if an item is not
found and no default is provided an `Error` will be thrown.

```js
import findIndex from '@jx/iter/sync/findIndex.mjs'

findIndex([{ x: 10, y: 20 }, { x: 20, y: 20 }, { x: 30, y: 40 }, { x: 0, y: 0 }], ({ x, y }) => x + y >= 40)
// 1

findIndex([{ x: 10, y: 20 }, { x: 20, y: 20 }], ({ x, y }) => x + y >= 9000)
// -> throws Error('not found')

findIndex([1, 2, 3, 4, 5, 6], -1, i => i % 100 === 0)
// -1 // The default value

```
