
### `find`

###### sync

```ts
function find<T>(
    iterable: Iterable<T>,
): T

function find<T>(
    iterable: Iterable<T>,
    predicate: (item: T, index: number) => any,
): T

function find<T, K>(
    iterable: Iterable<T>,
    defaultValue: K,
    predicate: (item: T, index: number) => any,
): T | K
```

###### async

```ts
function find<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
): Promise<T>

function find<T>(
    asyncIterable: AsyncOrSyncIterable<T>,
    predicate: (item: T, index: number) => any | Promise<any>,
): Promise<T>

function find<T, K>(
    asyncIterable: AsyncOrSyncIterable<T>,
    defaultValue: K,
    predicate: (item: T, index: number) => any | Promise<any>,
): Promise<T | K>
```

The `find` function returns the first value in the iterable for which the predicate function returns a truthy value.
If the item is not found and a `defaultValue` is provided then it will return the `defaultValue`, otherwise if an item is not
found and no default is provided an `Error` will be thrown.

```js
import find from '@jx/iter/sync/find.mjs'

find([{ x: 10, y: 20 }, { x: 20, y: 20 }, { x: 30, y: 40 }, { x: 0, y: 0 }], ({ x, y }) => x + y >= 40)
// { x: 20, y: 20 }

find([{ x: 10, y: 20 }, { x: 20, y: 20 }], ({ x, y }) => x + y >= 9000)
// -> throws Error('not found')

find([1, 2, 3, 4, 5, 6], -1, i => i % 100 === 0)
// -1 // The default value
```
